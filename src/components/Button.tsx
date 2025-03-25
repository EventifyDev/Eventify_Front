import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  success?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon = false,
  startIcon,
  endIcon,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  success = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "font-medium transition-all duration-300 flex items-center justify-center rounded-xl";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
    secondary: "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30",
    outline: "border-2 border-primary text-primary hover:bg-primary/10"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 gap-2",
    lg: "px-6 py-3 text-lg gap-2.5"
  };

  const getContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </div>
      );
    }

    if (success) {
      return (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Added!</span>
        </div>
      );
    }

    return (
      <>
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        <span className="flex items-center">{children}</span>
        {endIcon && <span className="flex items-center">{endIcon}</span>}
        {icon && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
      </>
    );
  };

  return (
    <button 
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${loading || success ? 'cursor-default' : 'transform hover:scale-[1.02] active:scale-[0.98]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {getContent()}
    </button>
  );
};