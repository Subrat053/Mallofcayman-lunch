import React from 'react'
import logo from '../assets/logo2.png'
import { RxRocket } from "react-icons/rx";
const Navbar = () => {
    return (
        <div className="fixed top-0 w-full z-50">
            
            <nav className="bg-white backdrop-blur-md border-b border-white/10">
                <div className="max-w-[1350px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-0">
                    <img src={logo} alt="Mall of Cayman Logo" className='h-12 md:h-16 scale-125 md:scale-150 object-contain w-32 md:w-44'/>
                    <div className='flex  justify-center w-full'>

                    <span className="animate-fade-in flex items-center gap-2 md:gap-3 text-sm md:text-base text-center text-blue-700"><RxRocket className='text-red-600'/> Launching April 1st, 2026</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar