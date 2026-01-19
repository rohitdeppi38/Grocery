import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "All", path: "/" },
    { name: "Dairy", path: "/dairy" },
    { name: "Fruits", path: "/fruits" },
    { name: "Vegetables", path: "/vegetables" },
    { name: "Rice-Oil", path: "/riceoil" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-green-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="logo.png"
            alt="vegetable"
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full shadow-md border-2 border-green-400"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-green-800">
            SABJI BAZZAR
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-red-400 text-white shadow-md'
                    : 'hover:bg-red-100 hover:text-red-600'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button className="text-lg font-semibold px-5 py-1 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-500">
            Login
          </button>
          <button className="text-lg font-semibold px-5 py-1 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-400">
            Sign up
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Toggle Menu"
        >
          <span className="w-6 h-0.5 bg-green-900"></span>
          <span className="w-6 h-0.5 bg-green-900"></span>
          <span className="w-6 h-0.5 bg-green-900"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-green-100 px-4 pb-4 shadow-md">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg ${
                    isActive
                      ? 'bg-red-400 text-white'
                      : 'hover:bg-red-200'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button className="w-full py-2 bg-orange-600 text-white rounded-lg">
              Login
            </button>
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg">
              Sign up
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
 