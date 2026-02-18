import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, 
  FiMail, FiPhone, FiMapPin, FiArrowRight, FiSend 
} from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans mt-2">
      
      {/* ================= TOP SECTION: NEWSLETTER ================= */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Join the Fresh Club 🌿</h3>
            <p className="text-stone-400 text-sm">Get 10% off your first order and exclusive recipes.</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full sm:w-80 bg-stone-800 border border-stone-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-stone-600"
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Subscribe <FiSend size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* ================= MIDDLE SECTION: LINKS ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center text-xl border border-emerald-800">
               🥗
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              SABJI<span className="text-emerald-500">BAZZAR</span>
            </h2>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            Fresh, organic, and locally sourced produce delivered straight to your doorstep. We believe in quality you can taste and trust.
          </p>
          <div className="flex gap-4">
            {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop All', path: '/shop' },
              { name: 'About Us', path: '/about' },
              { name: 'Blogs & Recipes', path: '/blogs' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.path} 
                  className="group flex items-center gap-2 text-stone-400 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300">
                    <FiArrowRight size={12} />
                  </span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Categories</h4>
          <ul className="space-y-4">
            {[
              'Fresh Vegetables', 'Seasonal Fruits', 'Dairy & Eggs', 'Organic Spices', 'Cold Pressed Oils'
            ].map((item) => (
              <li key={item}>
                <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & App */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Get in Touch</h4>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3 text-stone-400">
              <FiMapPin className="mt-1 text-emerald-500 shrink-0" />
              <span>123 Green Market St,<br />Farming District, NY 10012</span>
            </li>
            <li className="flex items-center gap-3 text-stone-400">
              <FiPhone className="text-emerald-500 shrink-0" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3 text-stone-400">
              <FiMail className="text-emerald-500 shrink-0" />
              <span>support@sabjibazzar.com</span>
            </li>
          </ul>

          <h5 className="text-white font-semibold mb-3 text-sm">Download Our App</h5>
          <div className="flex gap-2">
            <button className="bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-lg border border-stone-700 flex items-center gap-2 transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" className="w-4" alt="Apple" />
              <div className="text-left leading-none">
                <span className="text-[10px] block text-stone-400">Download on the</span>
                <span className="text-xs font-bold text-white">App Store</span>
              </div>
            </button>
            <button className="bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-lg border border-stone-700 flex items-center gap-2 transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" className="w-4" alt="Android" />
              <div className="text-left leading-none">
                <span className="text-[10px] block text-stone-400">Get it on</span>
                <span className="text-xs font-bold text-white">Google Play</span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="border-t border-stone-800 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-stone-500 text-xs text-center md:text-left">
            © 2025 <span className="text-stone-300 font-semibold">Sabji Bazzar</span>. All rights reserved. 
            <span className="mx-2">|</span> 
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
            <span className="mx-2">|</span> 
            <a href="#" className="hover:text-emerald-400">Terms of Service</a>
          </p>

          {/* Payment Icons (Visual Only) */}
          <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
             <div className="h-6 w-10 bg-white rounded flex items-center justify-center">
               <span className="text-[10px] font-bold text-blue-800 italic">VISA</span>
             </div>
             <div className="h-6 w-10 bg-white rounded flex items-center justify-center">
               <div className="flex -space-x-1">
                 <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
               </div>
             </div>
             <div className="h-6 w-10 bg-white rounded flex items-center justify-center">
               <span className="text-[8px] font-bold text-blue-500">PayPal</span>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;