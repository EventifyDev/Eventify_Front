import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string | undefined;
  touched?: boolean | undefined;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  errorClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  icon,
  error,
  touched,
  helperText,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  iconClassName = '',
  errorClassName = '',
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const hasError = touched && error;
  
  const defaultInputClasses = `form-input w-full rounded-lg border-2 bg-white/5 backdrop-blur-sm
    transition-all duration-300 placeholder:text-gray-400
    ${hasError 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:border-primary dark:border-gray-700'
    } hover:border-primary`;
  
  const finalInputClassName = `${defaultInputClasses} ${icon ? 'ps-10' : 'ps-4'} ${inputClassName}`;
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={`relative group ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-semibold mb-2 text-primary ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={finalInputClassName}
          {...props}
        />
        
        {icon && (
          <span className={`absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300 ${iconClassName}`}>
            {icon}
          </span>
        )}
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-primary"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {hasError && (
        <div className={`text-red-500 text-sm mt-1 animate-fade-in ${errorClassName}`}>
          {error}
        </div>
      )}
      
      {helperText && !hasError && (
        <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
          {helperText}
        </div>
      )}
    </div>
  );
};