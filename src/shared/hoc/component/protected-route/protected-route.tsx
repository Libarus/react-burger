import { logout, validateTokenThunk } from '@services/actions/authSlice';
import { useAppDispatch } from '@services/store';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { TokenService } from '@/services/token.service';

interface ProtectedRouteProps {
    element: JSX.Element;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
    const dispatch = useAppDispatch();

    const [isValidating, setIsValidating] = useState<boolean>(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                if (TokenService.GetAccessToken() && TokenService.GetRefreshToken()) {
                    await dispatch(validateTokenThunk()).unwrap();
                }
            } catch {
                dispatch(logout());
            } finally {
                setIsValidating(false);
            }
        };

        validateAuth();
    }, [dispatch]);

    if (isValidating) {
        return <div>Проверка авторизации...</div>;
    }

    if (!TokenService.GetAccessToken()) {
        return <Navigate to='/login' replace />;
    }

    return element;
}
