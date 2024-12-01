import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon = true,
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`py-2.5 px-4 rounded-md font-semibold transition-all duration-300 
        flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      <span className='flex items-center justify-center'>{children}</span>
      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
};