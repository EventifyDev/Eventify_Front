import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const NavLinks = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => {
        const isActive = location.pathname === link.href;
        
        return (
          <NavLink
            key={link.label}
            to={link.href}
            className={`
              relative group px-3 py-2
              font-normal text-base font-nunito
              ${isActive 
                ? 'text-primary' 
                : 'text-gray-600 dark:text-gray-300'
              }
            `}
          >
            {/* Link Text */}
            <span className="relative z-10 hover:text-primary">
              {link.label}
            </span>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-0.5 
              bg-gradient-to-r from-[#4361EE] to-[#EF1262]
              transform origin-left scale-x-0 
              transition-transform duration-300 ease-out
              group-hover:scale-x-100">
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};