import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const navItems = [
    { name: "All", path: "/" },
    { name: "Tea", path: "/tea" },
    { name: "Fruits", path: "/fruits" },
    { name: "Vegetables", path: "/vegetables" },
    { name: "Oil", path: "/oil" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-green-200 shadow-lg">
      <div className="max-w-7lg mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left: Logo and Brand */}
        <div className="flex items-center space-x-4">
          <img
            src="logo.png"
            alt="vegetable"
            className="w-12 h-12 object-cover rounded-full shadow-md border-2 border-green-400"
          />
          <h1 className="text-2xl font-bold text-green-800 tracking-wide">SABJI BAZZAR</h1>
        </div>

        {/* Right: Navigation */}
        <nav>
          <ul className="flex gap-6 text-lg font-medium text-green-900">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
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
              </li>
            ))}
            <button>category</button>
          </ul>
        </nav>
        <div>
            <button className='text-lg font-semibold px-6 py-1 cursor-pointer text-gray-200 bg-orange-600 rounded-lg hover:bg-red-200 hover:text-red-600 mx-2'>login</button>
            <button className='text-lg font-semibold mx-8 cursor-pointer text-white hover:text-gray-300 bg-blue-500 rounded-lg px-3 py-1'>sign in</button>
          </div>
      </div>
    </header>
  );
};

export default Header;
