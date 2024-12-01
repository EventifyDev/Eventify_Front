import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with gradient and blur */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/70 backdrop-blur-md transition-all duration-300 ease-in-out" 
        onClick={onClose} 
      />
  
      {/* Modal Container with scaling animation */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div 
          className="relative w-full max-w-2xl transform transition-all duration-300 ease-out"
          style={{
            animation: 'modalScale 0.3s ease-out forwards',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          {/* Modal Content */}
          <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-gray-100 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            
            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {title}
                </h2>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="group relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
  
            {/* Content with subtle shadow */}
            <div className="relative p-6 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-900/50">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};