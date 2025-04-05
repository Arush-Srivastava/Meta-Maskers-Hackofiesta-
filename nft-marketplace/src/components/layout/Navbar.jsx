import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { FiSearch, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <Logo />
      </div>
      
      <div className="hidden md:flex items-center mx-4 flex-1 max-w-md">
        <div className="relative w-full flex items-center">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items, collections, and accounts"
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div 
            className="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
            onClick={handleProfileClick}
          >
            <FiUser className="text-gray-700 w-5 h-5" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <button className="bg-primary text-white px-4 py-2 rounded-full flex items-center">
          <span className="mr-2">◆</span>
          Connect wallet
        </button>
      </div>
      
      <button 
        className="md:hidden ml-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden z-50">
          <div className="flex items-center mb-4">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search items, collections, and accounts"
              className="w-full py-2 px-4 border border-gray-200 rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <NavLink href="/" label="Home" active />
            <NavLink href="/profile" label="Profile" />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, label, active, hasDropdown }) => {
  const navigate = useNavigate();
  
  return (
    <a 
      onClick={() => navigate(href)}
      className={`text-sm font-medium flex items-center cursor-pointer ${active ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
    >
      {label}
      {hasDropdown && (
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </a>
  );
};

export default Navbar;