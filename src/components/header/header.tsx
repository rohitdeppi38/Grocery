import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  FiSearch, FiMapPin, FiMenu, FiX, 
  FiShoppingCart, FiHeart, FiChevronRight, FiLoader 
} from "react-icons/fi";

const Header = () => {
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
  const [locationData, setLocationData] = useState<{ city: string; region: string } | null>(null);
  
  // Refs & Hooks
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();

  // 1. Scroll Detection for Glass Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Auto-focus Search Input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // 3. Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // API Call
  const getCityByIP = async () => {
    setIsLoadingLoc(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setLocationData({ city: data.city, region: data.region });
    } catch (err) {
      console.error("IP location failed", err);
    } finally {
      setIsLoadingLoc(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Vegetables", path: "/vegetables" },
    { name: "Fruits", path: "/fruits" },
    { name: "Dairy", path: "/dairy" },
  ];

  return (
    <>
      {/* ================= 1. SEARCH OVERLAY (Focus Mode) ================= */}
      <div 
        className={`fixed inset-0 z-[60] bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setSearchOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-full bg-white shadow-xl transition-transform duration-300 ease-out ${searchOpen ? 'translate-y-0' : '-translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
            <div className="relative">
              <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for 'Fresh Spinach', 'Milk', 'Organic Eggs'..."
                className="w-full pl-10 pr-12 py-3 text-lg md:text-2xl font-light text-gray-800 placeholder:text-gray-300 border-b border-gray-100 focus:border-emerald-500 focus:outline-none bg-transparent transition-colors"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={24} className="text-gray-500" />
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2 self-center">Trending:</span>
              {['🥔 Potato', '🧅 Onion', '🍅 Tomato', '🍌 Banana'].map(tag => (
                <button key={tag} className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 text-sm hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN NAVBAR ================= */}
      <header 
        className={`
          sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent
          ${isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-2' 
            : 'bg-white py-4'}
        `}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <NavLink to="/" className="flex items-center gap-2 group z-50">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border-2 border-emerald-500 shadow-lg shadow-emerald-100 transition-transform group-hover:scale-105">
              <img
                src="/logo.png" 
                alt="Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=SB&background=10b981&color=fff";
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-emerald-950 leading-none tracking-tight">
                SABJI<span className="text-emerald-600">BAZZAR</span>
              </h1>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium hidden sm:block">
                Fresh & Organic
              </span>
            </div>
          </NavLink>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-full border border-gray-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            
            {/* Location (Desktop) */}
            <button 
              onClick={!locationData ? getCityByIP : undefined}
              className={`
                hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border mr-2
                ${locationData 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'}
              `}
            >
              {isLoadingLoc ? <FiLoader className="animate-spin" /> : <FiMapPin />}
              <span className="max-w-[100px] truncate">
                {isLoadingLoc ? "Locating..." : (locationData ? `${locationData.city}` : "Set Location")}
              </span>
            </button>

            {/* Utility Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiSearch size={20} />
              </button>

              <NavLink to="/wishlist" className="hidden sm:flex p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                <FiHeart size={20} />
              </NavLink>

              <NavLink to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all group mr-2">
                <FiShoppingCart size={20} />
                <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
              </NavLink>
            </div>

            {/* --- SEPARATOR --- */}
            <div className="hidden lg:block h-6 w-px bg-gray-200 mx-1"></div>

            {/* --- DESKTOP AUTH BUTTONS --- */}
            <div className="hidden lg:flex items-center gap-2">
              <NavLink to="/login">
                <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors">
                  Log In
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg shadow-emerald-200 transition-all hover:shadow-emerald-300 hover:-translate-y-1">
                  Sign Up
                </button>
              </NavLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors ml-1"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= 3. MOBILE DRAWER ================= */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={`
          absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl 
          transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          flex flex-col
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          
          {/* Drawer Header */}
          <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-lg text-gray-800">Menu</h2>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Location Mobile */}
            <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3 border border-emerald-100">
              <div className="bg-white p-2.5 rounded-full text-emerald-600 shadow-sm">
                <FiMapPin />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Delivering to</p>
                <p className="text-sm font-bold text-gray-800 truncate">
                   {isLoadingLoc ? "Locating..." : (locationData ? `${locationData.city}, ${locationData.region}` : "Location not set")}
                </p>
              </div>
              {!locationData && (
                <button onClick={getCityByIP} className="text-xs bg-emerald-600 text-white px-2 py-1 rounded shadow-sm">
                  Detect
                </button>
              )}
            </div>

            {/* Nav Links */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Shop</p>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center justify-between px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-gray-100 text-emerald-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-50 hover:pl-6'}
                  `}
                >
                  {link.name}
                  <FiChevronRight className="text-gray-300" />
                </NavLink>
              ))}
            </div>

            <hr className="border-gray-100" />
            
            {/* Account Mobile */}
            <div className="space-y-1">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Account</p>
               <NavLink to="/orders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                 <FiShoppingCart className="text-gray-400" /> My Orders
               </NavLink>
               <NavLink to="/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                 <FiHeart className="text-gray-400" /> Wishlist
               </NavLink>
            </div>
          </div>

          {/* Drawer Footer (Auth Buttons) */}
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <NavLink to="/login" className="w-full">
                <button className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-white transition-colors">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup" className="w-full">
                <button className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all active:scale-95">
                  Sign Up
                </button>
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;