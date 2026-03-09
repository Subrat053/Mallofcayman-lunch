import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import { RxRocket } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full z-50">
      <nav className="bg-white backdrop-blur-md border-b border-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex md:items-center md:justify-between md:py-4">
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Mall of Cayman Logo"
                className="h-14 object-contain"
              />
            </Link>
            
            <div className="flex-1 flex justify-center mx-8">
              <span className="animate-fade-in font-semibold flex items-center gap-2 text-base text-blue-700 whitespace-nowrap">
                <RxRocket className="text-red-600 flex-shrink-0" />
                Launching April 1st, 2026
              </span>
            </div>

            <Link
              to="/register"
              className="flex-shrink-0 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              Register as Seller
            </Link>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="md:hidden py-3 space-y-3">
            {/* Logo and Button Row */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex-shrink-0">
                <img
                  src={logo}
                  alt="Mall of Cayman Logo"
                  className="h-12 object-contain"
                />
              </Link>
              
              <Link
                to="/register"
                className="flex-shrink-0 px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>

            {/* Launch Message Row */}
            <div className="flex justify-center">
              <span className="animate-fade-in font-semibold flex items-center gap-2 text-xs sm:text-sm text-center text-blue-700">
                <RxRocket className="text-red-600 flex-shrink-0" />
                <span>Launching April 1st, 2026</span>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
