import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const LoginBoxed = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Index = lazy(() => import('../pages/dashbord/Index'));
const EventList = lazy(() => import('../pages/dashbord/EventsManagement'));
const Error404 = lazy(() => import('../pages/Error404'));
const EventDetailsDashbord = lazy(() => import('../pages/dashbord/EventDetails'));
const ParticipantsList = lazy(() => import('../pages/dashbord/ParticipantsList'));
const HomePage = lazy(() => import('../pages/Home'));
const HeroSection = lazy(() => import('../components/home/HeroSection') );
const Events = lazy(() => import('../pages/Events'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const VerifyOTP = lazy(() => import('../pages/auth/VerifyOTP'));
const RoleSelection = lazy(() => import('../pages/auth/RoleSelection'));
const VerifyDeviceOTP = lazy(() => import('../pages/auth/VerifyDeviceOTP'));
const ApproveEvents = lazy(() => import('../pages/dashbord/ApproveEvents'));
const EventDetails = lazy(() => import('../pages/EventDetails'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const RolesManagement = lazy(() => import('../pages/dashbord/RolesManagement'));
const Profile = lazy(() => import('../pages/Profile'));
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
        path: '/auth/reset-password',
        element: <ResetPassword />,
        layout: 'blank',
    },
    {
        path: '/auth/verify-otp',
        element: <VerifyOTP />,
        layout: 'blank',
    },
    {
        path: '/auth/verify-device',
        element: <VerifyDeviceOTP />,
        layout: 'blank',
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
        layout: 'blank',
    },
    {
        path: '/auth/role-selection',
        element: <RoleSelection />,
        layout: 'blank',
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Index />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/dashboard/events',
        element: (
            <ProtectedRoute>
                <EventList />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/dashboard/roles-management',
        element: (
            <ProtectedRoute>
                <RolesManagement />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/dashboard/approve-events',
        element: (
            <ProtectedRoute>
                <ApproveEvents />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/dashboard/events/:event_id',
        element: <EventDetailsDashbord />,
        layout: 'default',
    },
    {
        path: '/dashboard/events/:event_id/participants',
        element: <ParticipantsList />,
        layout: 'default',
    },
    {
        path: '/',
        element: <HomePage />,
        layout: 'main',
    },
    {
        path: '/contact',
        element: <Contact />,
        layout: 'main',
    },
    {
        path: '/event-details/:event_id',
        element: <EventDetails />,
        layout: 'main',
    },
    {
        path: '/events',
        element: <Events />,
        layout: 'main',
    },
    {
        path: '/about',
        element: <About />,
        layout: 'main',
    },
    {
        path: '/profile',
        element: <Profile />,
        layout: 'main',
    },
    {
        path: '*',
        element: <Error404 />,
        layout: 'blank',
    },

];

export { routes };