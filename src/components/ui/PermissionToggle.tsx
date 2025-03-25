import React from 'react';
import { Shield, Check } from 'lucide-react';

type PermissionToggleProps = {
    permission: string;
    isSelected: boolean;
    onToggle: (permission: string) => void;
}

export const PermissionToggle: React.FC<PermissionToggleProps> = ({ permission, isSelected, onToggle }) => (
    <div
        onClick={() => onToggle(permission)}
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
            ${isSelected
                ? 'bg-primary/10 text-primary ring-1 ring-primary'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
    >
        {isSelected ? (
            <Check className="w-5 h-5 shrink-0" />
        ) : (
            <Shield className="w-5 h-5 shrink-0" />
        )}
        <span className="text-sm font-medium">{permission}</span>
    </div>
); 