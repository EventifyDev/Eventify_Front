import React from 'react';

type FormFieldProps = {
    label: string;
    children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {label}
        </label>
        {children}
    </div>
); 