import React from 'react'
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Brand */}
        <div className="text-2xl font-bold mb-4 md:mb-0">
          RetailVision
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-2xl">
          <a href="#" className="hover:text-pink-600 transition">
            <FiInstagram />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <FiFacebook />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FiTwitter />
          </a>
        </div>

      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} RetailVision. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer