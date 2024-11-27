import { lazy } from 'react';
const LoginBoxed = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Index = lazy(() => import('../pages/Index'));
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
        element: <Index />,
        layout: 'default',
    },
];

export { routes };
