import React from "react";
import { Mail, Phone, Send } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-[#22222a] text-white overflow-hidden max-h-80">
      {/* Background effects */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_center,_black,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3b82f620_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#1d4ed820_0%,transparent_50%)]" /> */}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-2 py-8">
        <div className="flex items-center justify-between">
          {/* Company Info */}
          <div>
            {/* <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-4">
              Ctrl Play 
            </h3> */}
            <div className="navbar-brand flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <a
                className="text-[#EAEAEA] text-2xl font-medium mt-2 -ml-1"
                href="/"
              >
                trl Play
              </a>
            </div>
            <p className="text-cyan-500 ml-2 mt-5">Back to the retro era.</p>
          </div>

          <div className="relative  pt-8">
          <div className="absolute inset-x-0 top-0 h-px" />
          <p className="text-center text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Ctrl-Play. All rights reserved.
          </p>
        </div>
        </div>

        {/* Bottom Bar */}
     
      </div>

      {/* Decorative elements */}
      {/* <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-blue-500 rounded-full filter blur-[128px] opacity-20" />
      <div className="absolute -right-32 -top-32 w-64 h-64 bg-blue-500 rounded-full filter blur-[128px] opacity-20" /> */}
    </footer>
  );
}
