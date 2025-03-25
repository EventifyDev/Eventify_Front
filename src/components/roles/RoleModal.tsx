import React, { useState, useEffect } from 'react';
import { Role, AVAILABLE_PERMISSIONS } from '../../types/role.type';
import { Modal } from '../Modal';
import { FormField } from '../ui/FormField';
import { ActionButton } from '../ui/ActionButton';
import { PermissionToggle } from '../ui/PermissionToggle';
import { toast } from 'sonner';

type RoleFormData = Pick<Role, 'name' | 'description' | 'permissions'>;

interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role?: Role;
    onSubmit: (role: RoleFormData) => Promise<void>;
    title: string;
}

export const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, role, onSubmit, title }) => {
    const [formData, setFormData] = useState<RoleFormData>({
        name: '',
        description: '',
        permissions: []
    });

    useEffect(() => {
        if (role) {
            setFormData({
                name: role.name,
                description: role.description,
                permissions: role.permissions
            });
        }
    }, [role]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
            setFormData({ name: '', description: '', permissions: [] });
        } catch (error) {
            toast.error('Failed to save role');
        }
    };

    const togglePermission = (permission: string) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions?.includes(permission)
                ? prev.permissions.filter(p => p !== permission)
                : [...(prev.permissions || []), permission]
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Role Name">
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                        required
                    />
                </FormField>

                <FormField label="Description">
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none resize-none h-24"
                        required
                    />
                </FormField>

                <FormField label="Permissions">
                    <div className="grid grid-cols-2 gap-4">
                        {AVAILABLE_PERMISSIONS.map(permission => (
                            <PermissionToggle
                                key={permission}
                                permission={permission}
                                isSelected={formData.permissions?.includes(permission)}
                                onToggle={togglePermission}
                            />
                        ))}
                    </div>
                </FormField>

                <div className="flex justify-end gap-4 mt-6">
                    <ActionButton onClick={onClose} variant="secondary">
                        Cancel
                    </ActionButton>
                    <ActionButton type="submit" variant="primary">
                        Save Role
                    </ActionButton>
                </div>
            </form>
        </Modal>
    );
}; 