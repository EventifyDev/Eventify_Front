import React from 'react';

type ActionButtonProps = {
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
    type?: 'button' | 'submit';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
    onClick, 
    variant = 'primary', 
    children,
    type = 'button'
}) => {
    const baseStyles = "px-6 py-2.5 rounded-xl transition-all";
    const variantStyles = {
        primary: "bg-primary text-white hover:opacity-90",
        secondary: "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
        danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]}`}
        >
            {children}
        </button>
    );
}; 