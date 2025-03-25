import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import EventifyLogo from '../EventifyLogo';

const Star = ({ size = 'small', color = '#4361EE', style = {} }) => {
    const sizeClasses = {
      tiny: 'w-1 h-1',
      small: 'w-2 h-2',
      medium: 'w-3 h-3'
    };
  
    return (
      <svg
        viewBox="0 0 24 24"
        fill={color}
        className={`${sizeClasses[size as keyof typeof sizeClasses]} opacity-40`}
        style={style}
      >
        <path d="M12 1l2.39 7.35h7.71l-6.24 4.53 2.38 7.34L12 16.69l-6.24 4.53 2.38-7.34-6.24-4.53h7.71z" />
      </svg>
    );
  };

  const FloatingStars = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const randomSize = ['tiny', 'small', 'medium'][Math.floor(Math.random() * 3)];
          const color = i % 2 === 0 ? '#4361EE' : '#EF1262';
          
          return (
            <Star
              key={i}
              size={randomSize}
              color={color}
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          );
        })}
      </div>
    );
  };
  

const FooterMain: React.FC = () => {
    return (
        <footer className="relative overflow-hidden border-t border-gray-200/50 dark:border-gray-800/50
          bg-slate-50 dark:bg-black
          text-gray-600 dark:text-gray-300">

            {/* Floating Stars Background */}
            <FloatingStars />

            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_40%,rgba(67,97,238,0.05)_70%,rgba(239,18,98,0.05))]" />
            
            <div className="container mx-auto px-6 py-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <NavLink to="/" 
                            className="group inline-flex items-center 
                            hover:opacity-90 transition-all duration-300"
                        >
                            <EventifyLogo />
                            <span className="ml-3 text-2xl font-bold font-nunito text-primary dark:text-white">
                                Eventify
                            </span>
                        </NavLink>
                        <p className="text-sm leading-relaxed">
                            Creating unforgettable moments and bringing people together through 
                            seamless event experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-6 
                          relative inline-flex items-center gap-2">
                            Quick Links
                            <span className="w-8 h-px bg-gradient-to-r from-[#4361EE] to-[#EF1262]" />
                        </h3>
                        <ul className="space-y-3">
                            {['About Us', 'Events', 'Contact', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <NavLink 
                                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="group inline-flex items-center text-sm"
                                    >
                                        <ExternalLink className="w-3 h-3 mr-2 opacity-0 -ml-5 
                                          transition-all duration-300 group-hover:opacity-100 
                                          group-hover:ml-0 text-primary" />
                                        <span className="transition-colors duration-300
                                          group-hover:text-primary">
                                            {item}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-6
                          relative inline-flex items-center gap-2">
                            Contact Us
                            <span className="w-8 h-px bg-gradient-to-r from-[#4361EE] to-[#EF1262]" />
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { icon: MapPin, text: '123 Event Street, City' },
                                { icon: Mail, text: 'contact@eventify.com' },
                                { icon: Phone, text: '+1 234 567 890' }
                            ].map(({ icon: Icon, text }) => (
                                <li key={text} className="group flex items-center gap-3 text-sm">
                                    <span className="p-2 rounded-lg 
                                      bg-gradient-to-r from-[#4361EE]/5 to-[#EF1262]/5
                                      group-hover:from-[#4361EE]/10 group-hover:to-[#EF1262]/10 
                                      transition-all duration-300">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-6
                          relative inline-flex items-center gap-2">
                            Follow Us
                            <span className="w-8 h-px bg-gradient-to-r from-[#4361EE] to-[#EF1262]" />
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: Facebook, label: 'Facebook' },
                                { icon: Twitter, label: 'Twitter' },
                                { icon: Instagram, label: 'Instagram' },
                                { icon: Linkedin, label: 'LinkedIn' }
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={`https://${label.toLowerCase()}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 p-2 
                                      rounded-xl text-sm
                                      bg-gradient-to-r from-transparent to-transparent
                                      hover:from-[#4361EE]/5 hover:to-[#EF1262]/5
                                      transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4 
                                      transition-transform duration-300
                                      group-hover:scale-110 group-hover:text-primary" 
                                    />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-8 
                  border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row 
                      justify-between items-center gap-4 text-sm">
                        <p className="opacity-75">
                            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
                        </p>
                        <p className="flex items-center gap-2">
                            Made with 
                            <Heart className="w-4 h-4 text-[#EF1262] animate-pulse" /> 
                            by Mohamed El Morjani
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterMain;