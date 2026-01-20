import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location, setLocation] = useState<{
    city: string;
    region: number;
  } | null>(null);

  const getCityByIP = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setLocation(data);
      console.log("City:", data.city);
      console.log("Region:", data.region);
      console.log("Country:", data.country_name);
    } catch (err) {
      console.error("IP location failed", err);
    }
  };



  const categories = [
    { name: "All", path: "/" },
    { name: "Dairy", path: "/dairy" },
    { name: "Fruits", path: "/fruits" },
    { name: "Vegetables", path: "/vegetables" },
    { name: "Rice & Oil", path: "/riceoil" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-green-300 shadow-lg">

      {/* ================= HEADER ROW ================= */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ---------- LOGO ---------- */}
        {!searchOpen && (
          <div className="flex items-center gap-3">
            <img
              src="logo.png"
              alt="logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-green-400"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-green-800">
              SABJI BAZZAR
            </h1>
            <div>
            {/**location  */}

              <div className="font-medium border bg-green-200 transition-all duration-300 border-green-800 px-2 py-1 pt-1 cursor-pointer rounded-lg">
                <FiMapPin />
              {!location &&
                <button onClick={getCityByIP} className=" cursor-pointer rounded-lg">
                  <span className="text-[12px]">Enter your location</span>
                </button>}
              {location &&
                <p className="text-sm font-normal font-stretch-50%">
                  {location.city} {location.region}
                </p>}
              </div>

            </div>
          </div>
        )}

        {/* ---------- SEARCH BAR ---------- */}
        {searchOpen && (
          <div className="flex-1 flex items-center gap-3">
            <input
              autoFocus
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xl font-bold hover:cursor-pointer"
            >
              ✖
            </button>
          </div>
        )}

        {/* ---------- RIGHT ACTIONS ---------- */}
        {!searchOpen && (
          <div className="flex items-center gap-6">

            {/* SEARCH ICON */}
            <button onClick={() => setSearchOpen(true)} className="text-xl cursor-pointer">
              <FiSearch />
            </button>

            {/* ===== CATEGORY DROPDOWN ===== */}
            <div className="relative group hidden md:block">
              <button className="px-4 py-2 rounded-lg font-medium hover:bg-green-200 hover:cursor-pointer">
                Categories
              </button>

              {/* DROPDOWN */}
              <div
                className="
                  absolute left-0 top-full mt-2
                  w-40 bg-white rounded-lg shadow-lg
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                "
              >
                {categories.map((cat) => (
                  <NavLink
                    key={cat.name}
                    to={cat.path}
                    className="block px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* LOGIN / SIGNUP */}
            <NavLink to="/login">
              <button className="px-5 sm:inline hidden py-1 bg-orange-600 text-white rounded-lg">
                Login
              </button>
            </NavLink>

            <NavLink to="/signup">
              <button className="px-5 py-1 sm:inline hidden bg-blue-500 text-white rounded-lg">
                Sign up
              </button>
            </NavLink>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1"
            >
              <span className="w-6 h-0.5 bg-green-900"></span>
              <span className="w-6 h-0.5 bg-green-900"></span>
              <span className="w-6 h-0.5 bg-green-900"></span>
            </button>
          </div>
        )}
      </div>

      {/* ================= MOBILE MENU ================= */}
      {!searchOpen && menuOpen && (
        <div className="md:hidden bg-green-100 px-4 pb-4 shadow-md">
          <ul className="flex flex-col gap-3">

            {/* Categories */}
            <p className="font-semibold text-green-800 mt-2">Categories</p>
            {categories.map((cat) => (
              <NavLink
                key={cat.name}
                to={cat.path}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-green-200 hover:rounded-2xl"
              >
                {cat.name}
              </NavLink>
            ))}

            <hr className="my-2 border-green-300" />

            {/* Login */}
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-2 bg-orange-600 text-white rounded-lg">
                Login
              </button>
            </NavLink>

            {/* Signup */}
            <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg">
                Sign up
              </button>
            </NavLink>
          </ul>
        </div>
      )}

    </header>
  );
};

export default Header;
