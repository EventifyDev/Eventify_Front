import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import { AuthProvider } from '../providers/AuthProvider';

const finalRoutes = routes.map((route) => ({
    ...route,
    element: (
        <AuthProvider>
            {route.layout === 'blank' ? (
                <BlankLayout>{route.element}</BlankLayout>
            ) : (
                <DefaultLayout>{route.element}</DefaultLayout>
            )}
        </AuthProvider>
    ),
}));

const router = createBrowserRouter(finalRoutes);

export default router;