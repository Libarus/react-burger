import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../../routes';

interface ProtectedRouteProps {
    element: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    if (false) {
        //user) {
        return element;
    }

    return <Navigate to={ROUTES.LOGIN} />;
};
