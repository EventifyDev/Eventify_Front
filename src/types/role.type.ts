export type UserRole = 'Super Admin' | 'Administrator' | 'Organizer' | 'Participant';

export interface Role {
    _id: string;
    name: string;
    permissions: string[];
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const AVAILABLE_PERMISSIONS = [
    'manage:users',
    'read:users',
    'manage:roles',
    'read:roles',
    'manage:events',
    'read:events',
    'manage:categories',
    'read:categories'
] as const;

export type Permission = typeof AVAILABLE_PERMISSIONS[number];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    'Super Admin': ['*'],
    'Administrator': [
        'manage:users',
        'read:users',
        'read:roles',
        'manage:roles',
        'read:events',
        'manage:events'
    ],
    'Organizer': [
        'manage:events',
        'read:events',
        'read:participants',
        'read:roles'
    ],
    'Participant': [
        'participate:events',
        'read:events'
    ]
};