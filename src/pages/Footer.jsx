import React from 'react'
import logo from '../assets/logo2.png'
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900 text-white py-8 md:py-10 px-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col  text-center md:text-left">
                    <img src={logo} alt="Mall of Cayman Logo" className='h-14 scale-125 lg:scale-110 object-contain md:h-16 md:w-42'/>
                    <p className="text-neutral-400 text-sm">Where Cayman's Next Business Leaders Begin</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-neutral-400">
                    <a href="https://www.mallofcayman.com/privacy" className="hover:text-white transition-colors">Privacy</a>
                    <a href="https://www.mallofcayman.com/terms" className="hover:text-white transition-colors">Terms</a>
                    <a href="https://www.mallofcayman.com/contact" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>

            <div className="mt-4 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
                <p>© 2026 Mall of Cayman. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer