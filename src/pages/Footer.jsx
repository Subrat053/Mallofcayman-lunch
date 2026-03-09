import React from 'react'
import logo from '../assets/logo2.png'

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <img
              src={logo}
              alt="Mall of Cayman Logo"
              className="h-12 md:h-14 object-contain"
            />
            <p className="text-slate-400 text-sm">Where Cayman's Next Business Leaders Begin</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <a href="https://www.mallofcayman.com/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">Privacy</a>
            <a href="https://www.mallofcayman.com/terms" className="text-slate-400 hover:text-white transition-colors duration-200">Terms</a>
            <a href="https://www.mallofcayman.com/contact" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2026 Mall of Cayman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;