import React from 'react';
import { Role } from '../../types/role.type';
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

type RoleTableProps = {
    roles: Role[];
    onEdit: (role: Role) => void;
    onDelete: (id: string) => void;
}

export const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit, onDelete }) => (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-white/50 dark:bg-slate-800/50">
                        <th className="text-left py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">
                            <div className="flex items-center gap-2">
                                Role Name
                            </div>
                        </th>
                        <th className="text-left py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">Description</th>
                        <th className="text-left py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">Permissions</th>
                        <th className="text-left py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">Created At</th>
                        <th className="text-right py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr 
                            key={role._id} 
                            className={`
                                border-t border-slate-200 dark:border-slate-700
                                transition-colors duration-150 hover:bg-slate-50/50 dark:hover:bg-slate-700/50
                                ${index === roles.length - 1 ? '' : 'border-b'}
                            `}
                        >
                            <td className="py-4 px-6">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {role.name}
                                </span>
                            </td>
                            <td className="py-4 px-6">
                                <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                    {role.description}
                                </p>
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex flex-wrap gap-2">
                                    {role.permissions.map(permission => (
                                        <span
                                            key={permission}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-white dark:bg-primary/60 dark:text-primary-light"
                                        >
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <span className="text-slate-600 dark:text-slate-300">
                                    {format(new Date(role.createdAt), 'MMM dd, yyyy')}
                                </span>
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(role)}
                                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl transition-colors"
                                        title="Edit Role"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(role._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                        title="Delete Role"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);