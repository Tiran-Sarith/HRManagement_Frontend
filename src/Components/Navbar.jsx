import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTalkToUsClick = () => {
    // Navigate to the "Support" page
    navigate('/contact');
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="relative flex items-center justify-between py-4 navbar md:px-40 px-7">
        <div className="ml-0 text-3xl text-green-800 font-rubikDirt">
          <a href="/home">INTELLISENSE</a>
        </div>

        {/* Mobile menu button with animation */}
        <button 
          className="block text-gray-500 transition-colors duration-300 md:hidden hover:text-green-800"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} className="transition-transform duration-300 rotate-180" /> : 
                   <Menu size={24} className="transition-transform duration-300" />}
        </button>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div 
            className="fixed inset-0 transition-opacity duration-300 bg-black bg-opacity-50 md:hidden"
            onClick={toggleMenu}
          />
        )}

        {/* Navigation menu - desktop and mobile */}
        <div 
          className={`
            md:flex md:items-center md:w-auto 
            ${isOpen 
              ? 'block fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out' 
              : 'hidden md:block transform translate-x-full md:transform-none transition-transform duration-300 ease-in-out'
            }
            ${isOpen ? 'translate-x-0' : ''}
          `}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between border-b md:hidden p-7">
            <span className="text-xl font-bold text-green-800">ITELLISENSE</span>
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-green-800"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation links */}
          <ul className={`
            font-sans text-lg
            md:flex md:space-x-8 md:items-center
            ${isOpen ? 'px-7 py-6 space-y-6' : 'space-x-8'}`}
          >
            <li className="font-semibold">
              <a href="/" className="block text-gray-500 transition-colors duration-300 hover:text-green-800">
                Home
              </a>
            </li>
            <li className="font-semibold">
              <a href="/services" className="block text-gray-500 transition-colors duration-300 hover:text-green-800">
                Services
              </a>
            </li>
            <li className="font-semibold">
              <a href="/career" className="block text-gray-500 transition-colors duration-300 hover:text-green-800">
                Careers
              </a>
            </li>
            <li className="font-semibold">
              <a href="/contact" className="block text-gray-500 transition-colors duration-300 hover:text-green-800">
                Support
              </a>
            </li>
            <li className="font-semibold">
              <a href="/aboutus" className="block text-gray-500 transition-colors duration-300 hover:text-green-800">
                About Us
              </a>
            </li>
            
            {/* Mobile Talk to Us button */}
            <li className="pt-6 border-t md:hidden">
              <button
                onClick={handleTalkToUsClick} // Navigate to the Support page
                className="relative w-full border-none space-x-2 font-sans font-semibold text-base text-white bg-green-900 py-2 px-5 
                  rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:bg-green-800
                  before:content-[''] before:absolute before:top-0 before:w-10 before:h-10
                  before:bg-white/70 before:transform before:-translate-x-[90px] before:skew-x-[40deg] before:transition-transform 
                  before:duration-[800ms] before:ease-[cubic-bezier(0.97,0.02,0.44,0.99)] hover:before:translate-x-[100px]"
              >
                Talk to Us
              </button>
            </li>
          </ul>
        </div>

        {/* Desktop Talk to Us button */}
        <div className="hidden md:block">
          <button
            onClick={handleTalkToUsClick} // Navigate to the Support page
            className="relative border-none space-x-2 font-sans font-semibold text-base text-white bg-green-900 py-2 px-5 
              rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:bg-green-800
              before:content-[''] before:absolute before:top-0 before:w-10 before:h-10
              before:bg-white/70 before:transform before:-translate-x-[90px] before:skew-x-[40deg] before:transition-transform 
              before:duration-[800ms] before:ease-[cubic-bezier(0.97,0.02,0.44,0.99)] hover:before:translate-x-[100px]"
          >
            Talk to Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
