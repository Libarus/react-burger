import { RouteObject } from 'react-router-dom';

import { ProtectedRoute } from '../hoc/component/protected-route';

import { ROUTES } from './paths';
import { ErrorPage } from '@/components/app/pages/error-page';
import { ErrorPage404 } from '@/components/app/pages/error-page-404/error-page-404';
import { FeedsPage } from '@/components/app/pages/feeds-page';
import { ForgotPasswordPage } from '@/components/app/pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '@/components/app/pages/login-page/login-page';
import { LogoutPage } from '@/components/app/pages/logout-page';
import { MainPage } from '@/components/app/pages/main-page/main-page';
import { OrdersPage } from '@/components/app/pages/orders-page/orders-page';
import { ProfilePage } from '@/components/app/pages/profile-page';
import { RegisterPage } from '@/components/app/pages/register-page/register-page';
import { ResetPasswordPage } from '@/components/app/pages/reset-password-page';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { ProfileLayout } from '@/components/layouts/profile-layout';
import { RootLayout } from '@/components/layouts/root-layout';

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
                path: ROUTES.ROOT,
                element: <AuthLayout />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: ROUTES.LOGIN,
                        element: <LoginPage />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: ROUTES.REGISTER,
                        element: <RegisterPage />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: ROUTES.FORGOT_PASSWORD,
                        element: <ForgotPasswordPage />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: ROUTES.RESET_PASSWORD,
                        element: <ResetPasswordPage />,
                        errorElement: <ErrorPage />,
                    },
                ],
            },

            {
                path: ROUTES.FEEDS,
                element: <FeedsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.FEED,
                element: <FeedsPage />,
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
                    {
                        path: ROUTES.ORDER,
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
