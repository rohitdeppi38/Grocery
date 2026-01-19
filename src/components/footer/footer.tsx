import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        <ul className="flex flex-wrap justify-center gap-8 text-lg font-medium">
          <li className="relative after:block after:h-[2px] after:w-0 after:bg-current
                      after:transition-all after:duration-75
                        hover:after:w-full">Disclaimer</li>
          <li className="relative after:block after:h-[2px] after:w-0 after:bg-current
                  after:transition-all after:duration-75
                  hover:after:w-full">Privacy Policy
          </li>
          <li className="relative after:block after:h-[2px] after:w-0 after:bg-current
                  after:transition-all after:duration-75
                  hover:after:w-full">About
          </li>
          <li className="relative after:block after:h-[2px] after:w-0 after:bg-current
              after:transition-all after:duration-75
              hover:after:w-full">Contact</li>
        </ul>
        <p className="text-center text-sm mt-6 text-gray-200">
          © 2025 <span className="font-semibold">sabzibazzar.com</span> — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
