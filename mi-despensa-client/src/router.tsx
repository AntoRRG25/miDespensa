import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { PantryPage } from './pages/PantryPage';
import { ShoppingPage } from './pages/ShoppingPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <PantryPage />,
            },
            {
                path: 'shopping',
                element: <ShoppingPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
        ],
    },
]);
