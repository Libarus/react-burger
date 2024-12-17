import { RouteObject } from 'react-router-dom';

import { ErrorPage } from '../../components/app/pages/error-page';
import { ErrorPage404 } from '../../components/app/pages/error-page-404/error-page-404';
import { ForgotPassword } from '../../components/app/pages/forgot-password/forgot-password';
import { Login } from '../../components/app/pages/login/login';
import { Profile } from '../../components/app/pages/profile';
import { Register } from '../../components/app/pages/register/register';
import { RootLayout } from '../../components/layouts/root-layout';
import { AuthLayout } from '../hoc/component/auth-layout';
import { ProtectedRoute } from '../hoc/component/protected-route';

import { ROUTES } from './paths';

export const routeConfig: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <AuthLayout element={<Login />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.REGISTER,
                element: <AuthLayout element={<Register />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.FORGOT_PASSWORD,
                element: <AuthLayout element={<ForgotPassword />} />,
                errorElement: <ErrorPage />,
            },
            {
                path: ROUTES.PROFILE,
                element: <ProtectedRoute element={<Profile />} />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage404 />,
    },
];
