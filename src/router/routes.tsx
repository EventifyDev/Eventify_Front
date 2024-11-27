import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const LoginBoxed = lazy(() => import('../pages/auth/login'));
const RegisterBoxed = lazy(() => import('../pages/auth/register'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/auth/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/register',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
];

export { routes };
