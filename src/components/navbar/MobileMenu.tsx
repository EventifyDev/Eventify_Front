import React, { useState } from 'react';
import { Menu, X, Home, Calendar, Info, Mail, LogIn, UserPlus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export const MobileMenu = ({ isOpen, onToggle }: MobileMenuProps) => {
  const [isMenuIcon, setIsMenuIcon] = useState(true);

  const handleClick = () => {
    setIsMenuIcon(!isMenuIcon);
    onToggle();
  };

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={handleClick}
        className="relative p-2 rounded-full
          bg-gradient-to-r from-[#4361EE] to-[#EF1262]
          text-white
          transition-all duration-300
          hover:shadow-lg hover:shadow-primary/20"
        aria-label={isMenuIcon ? 'Open Menu' : 'Close Menu'}
      >
        {isMenuIcon ? (
          <Menu className="w-6 h-6" />
        ) : (
          <X className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClick}
      />

      {/* Sliding Menu Panel */}
      <div className={`
        fixed top-0 right-0 bottom-0
        w-[300px] max-w-[80vw]
        bg-white dark:bg-gray-900
        shadow-2xl
        transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Menu Header */}
        <div className="h-16 px-6 flex items-center justify-between
          border-b border-gray-200 dark:border-gray-800">
          <span className="text-lg font-semibold 
            bg-gradient-to-r from-[#4361EE] to-[#EF1262]
            bg-clip-text text-transparent">
            Menu
          </span>
          <button
            onClick={handleClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors duration-200"
          >
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-6 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-2">
            {links.map(({ href, label, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                onClick={handleClick}
                className={({ isActive }) => `
                  flex items-center font-nunito gap-3 p-3 rounded-xl
                  font-medium transition-all duration-200
                  hover:translate-x-1
                  ${isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="space-y-4">
            <div className="h-px bg-gradient-to-r from-[#4361EE]/20 to-[#EF1262]/20" />
            
            {/* Login Button */}
            <button 
              onClick={handleClick}
              className="flex items-center font-nunito gap-3 w-full p-3 
                rounded-xl font-medium
                text-gray-700 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition-all duration-200
                hover:translate-x-1"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>

            {/* Register Button */}
            <button 
              onClick={handleClick}
              className="flex items-center justify-center font-nunito gap-3 w-full p-3 
                rounded-xl font-medium text-white
                bg-gradient-to-r from-[#4361EE] to-[#EF1262]
                hover:shadow-lg hover:shadow-primary/20
                transition-all duration-200
                hover:translate-x-1"
            >
              <UserPlus className="w-5 h-5" />
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};