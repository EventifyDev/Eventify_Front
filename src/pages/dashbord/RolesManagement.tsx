import React, { useState, useEffect } from 'react';
import { Role } from '../../types/role.type';
import { RoleService } from '../../services/role.service';
import { toast } from 'sonner';
import { Plus, Shield, Check, Search } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { ActionButton } from '../../components/ui/ActionButton';
import { RoleTable } from '../../components/roles/RoleTable';
import { RoleModal } from '../../components/roles/RoleModal';
import Loader from '../../components/ui/Loader';

type PermissionToggleProps = {
    permission: string;
    isSelected: boolean;
    onToggle: (permission: string) => void;
}

const PermissionToggle: React.FC<PermissionToggleProps> = ({ permission, isSelected, onToggle }) => (
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

type FormFieldProps = {
    label: string;
    children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {label}
        </label>
        {children}
        </div>
    );

type RoleFormData = Pick<Role, 'name' | 'description' | 'permissions'>;

const RolesManagement: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

    const roleService = RoleService.getInstance();

    const fetchRoles = async () => {
        try {
            const data = await roleService.getAllRoles();
            setRoles(data);
        } catch (error) {
            toast.error('Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCreateRole = async (roleData: RoleFormData) => {
        try {
            await roleService.createRole(roleData);
            toast.success('Role created successfully');
            fetchRoles();
        } catch (error) {
            toast.error('Failed to create role');
        }
    };

    const handleUpdateRole = async (roleData: RoleFormData) => {
        if (!editingRole?._id) return;
        try {
            await roleService.updateRole(editingRole._id, roleData);
            toast.success('Role updated successfully');
            fetchRoles();
            setEditingRole(null);
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleDeleteRole = async (id: string) => {
        try {
            await roleService.deleteRole(id);
            toast.success('Role deleted successfully');
            fetchRoles();
            setShowDeleteModal(null);
        } catch (error) {
            toast.error('Failed to delete role');
        }
    };

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="relative mb-8">
                    {/* Background Decoration */}
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>

                    {/* Main Header Content */}
                    <div className="relative flex justify-between items-center p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                        {/* Title with Gradient */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div className="absolute -top-1 -right-1">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                    Roles
                    </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Manage your roles
                                </p>
                            </div>
                        </div>

                        {/* Create Button with Animation */}
                        <ActionButton onClick={() => setShowCreateModal(true)} variant="primary">
                            <div className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        <span>Create Role</span>
                            </div>
                        </ActionButton>
                    </div>
                </div>

                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8">
                    <div className="relative mb-6">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search roles..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>

                    <RoleTable
                        roles={filteredRoles}
                        onEdit={setEditingRole}
                        onDelete={id => setShowDeleteModal(id)}
                    />
                </div>
            </div>

            <RoleModal
                isOpen={showCreateModal || !!editingRole}
                onClose={() => {
                    setShowCreateModal(false);
                    setEditingRole(null);
                }}
                role={editingRole || undefined}
                onSubmit={editingRole ? handleUpdateRole : handleCreateRole}
                title={editingRole ? 'Edit Role' : 'Create New Role'}
            />

            <Modal
                isOpen={!!showDeleteModal}
                onClose={() => setShowDeleteModal(null)}
                title="Delete Role"
            >
                <div className="space-y-6">
                    <p className="text-slate-600 dark:text-slate-300">
                            Are you sure you want to delete this role? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                        <ActionButton onClick={() => setShowDeleteModal(null)} variant="secondary">
                                Cancel
                        </ActionButton>
                        <ActionButton
                            onClick={() => showDeleteModal && handleDeleteRole(showDeleteModal)}
                            variant="danger"
                            >
                                Delete
                        </ActionButton>
                    </div>
                </div>
            </Modal>
        </div >
    );
};

export default RolesManagement; 