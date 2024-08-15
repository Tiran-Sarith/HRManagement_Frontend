import React from "react";

function Navbar() {
  return (
    
      <div className="sticky top-0 z-50 w-full overflow-hidden bg-white shadow-md">
  <div className="justify-between py-4 md:px-40 px-7 md:flex">
    <div className="ml-0 text-3xl font-extrabold text-green-800" >
      <a href="/home" >LOGO</a>
           
          </div>
          <ul className="space-x-8 font-sans text-lg md:flex pl-9 md:pl-0">
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
            <button className="px-5 py-2 space-x-2 font-semibold tracking-wide text-white bg-green-900 my-7 md:my-0 md:ml-8 hover:bg-yellow-600">
              Talk to Us
            </button>
          </div>
        </div>
      </div>
   
  );
}

export default Navbar;
