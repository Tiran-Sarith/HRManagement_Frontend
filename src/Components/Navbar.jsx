import React from "react";
import "../App.css";

function Navbar() {
  return (
   
    
  <div className="sticky top-0 z-50 w-full overflow-hidden bg-white shadow-md">
    <div className="justify-between py-4 navbar md:px-40 px-7 md:flex ">
    <div className="ml-0 text-3xl font-extrabold text-green-800" >
      <a href="/home" >LOGO</a>
           
          </div>
          <ul className="space-x-8 font-sans text-lg navul md:flex pl-9 md:pl-0">
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <a href="/home" className="text-gray-500 hover:text-green-800">
                Home
              </a>
            </li>
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <a href="/" className="text-gray-500 hover:text-green-800">
                Services
              </a>
            </li>
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <a href="/" className="text-gray-500 hover:text-green-800">
                Careers
              </a>
            </li>
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <a href="/" className="text-gray-500 hover:text-green-800">
                Support
              </a>
            </li>
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <a href="/" className="text-gray-500 hover:text-green-800">
                About Us
              </a>
            </li>
          </ul>
          <div>
            {" "}
            {/* <button className="relative px-5 py-2 space-x-2 overflow-hidden font-semibold tracking-wide text-white origin-center transform bg-green-900 cursor-pointer my-7 md:my-0 md:ml-8 hover:bg-yellow-600">
              Talk to Us
            </button> */}
            <button className="relative border-none space-x-2 font-sans font-semibold text-base text-white  bg-green-900  py-2 px-5 overflow-hidden cursor-pointer before:content-[''] md:my-0 md:ml-8 before:absolute before:top-0 before:w-10 before:h-10 before:bg-white/70 before:transform before:-translate-x-[90px] before:skew-x-[40deg] before:transition-transform before:duration-[800ms] before:ease-[cubic-bezier(0.97,0.02,0.44,0.99)] hover:before:translate-x-[100px]">
  Talk to Us
</button>

          </div>
        </div>
      </div>
     
   
  );
}

export default Navbar;
