import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const LoginBoxed = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Index = lazy(() => import('../pages/index'));
const EventList = lazy(() => import('../pages/eventList'));
const Error404 = lazy(() => import('../pages/Error404'));

const routes = [
    {
        path: '/auth/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/register',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Index />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/events',
        element: (
            <ProtectedRoute>
                <EventList />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
];

export { routes };