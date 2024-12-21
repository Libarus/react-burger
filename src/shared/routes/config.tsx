import { RouteObject } from 'react-router-dom';

import { ErrorPage } from '../../components/app/pages/error-page';
import { ErrorPage404 } from '../../components/app/pages/error-page-404/error-page-404';
import { FeedPage } from '../../components/app/pages/feed-page';
import { ForgotPasswordPage } from '../../components/app/pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '../../components/app/pages/login-page/login-page';
import { LogoutPage } from '../../components/app/pages/logout-page';
import { MainPage } from '../../components/app/pages/main-page/main-page';
import { OrdersPage } from '../../components/app/pages/orders-page/orders-page';
import { ProfilePage } from '../../components/app/pages/profile-page';
import { RegisterPage } from '../../components/app/pages/register-page/register-page';
import { ProfileLayout } from '../../components/layouts/profile-layout';
import { RootLayout } from '../../components/layouts/root-layout';
import { AuthLayout } from '../hoc/component/auth-layout';
import { ProtectedRoute } from '../hoc/component/protected-route';

import { ROUTES } from './paths';

export const routeConfig: RouteObject[] = [
    {
        path: ROUTES.ROOT,
        element: <RootLayout />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <MainPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.INGREDIENTS,
                element: <MainPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.LOGIN,
                element: <AuthLayout element={<LoginPage />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.REGISTER,
                element: <AuthLayout element={<RegisterPage />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.FORGOT_PASSWORD,
                element: <AuthLayout element={<ForgotPasswordPage />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.FEED,
                element: <FeedPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.PROFILE,
                element: <ProtectedRoute element={<ProfileLayout />} />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: ROUTES.PROFILE,
                        element: <ProfilePage />, //<ProtectedRoute element={<Profile />} />,
                    },
                    {
                        path: ROUTES.ORDERS,
                        element: <OrdersPage />, //<ProtectedRoute element={<Profile />} />,
                    },
                ],
            },
        ],
    },
    {
        path: ROUTES.LOGOUT,
        element: <LogoutPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '*',
        element: <ErrorPage404 />,
    },
];
