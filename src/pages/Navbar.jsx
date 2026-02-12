import React from 'react'
import logo from '../assets/logo2.png'
import { RxRocket } from "react-icons/rx";
const Navbar = () => {
    return (
        <div className="fixed top-0 w-full z-50">
            <nav className="bg-white backdrop-blur-md border-b border-white/10">
                <div className="max-w-[1350px] mx-auto px-6 py-2 flex flex-col md:flex-row items-center gap-1 md:gap-0">
                    <img src={logo} alt="Mall of Cayman Logo" className=' h-12 md:h-14 scale-105 md:scale-125 object-contain '/>
                    <div className='flex  justify-center w-full'>

                    <span className="animate-fade-in font-semibold flex items-center gap-2 text-sm md:text-base text-center text-blue-700"><RxRocket className='text-red-600'/>Launching April 1st, 2026</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar