import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const LoginBoxed = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Index = lazy(() => import('../pages/Index'));
const EventList = lazy(() => import('../pages/eventList'));
const Error404 = lazy(() => import('../pages/Error404'));
const EventDetails = lazy(() => import('../pages/EventDetails'));
const ParticipantsList = lazy(() => import('../pages/ParticipantsList'));

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
    {
        path: '/events/:event_id',
        element: <EventDetails />,
        layout: 'default',
    },
    {
        path: '/events/:event_id/participants',
        element: <ParticipantsList />,
        layout: 'default',
    },
    {
        path: '*',
        element: <Error404 />,
        layout: 'blank',
    },

];

export { routes };