import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { logout, validateTokenThunk } from '@services/actions/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '@services/store';

interface ProtectedRouteProps {
    element: JSX.Element;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
    const dispatch = useAppDispatch();

    const { accessToken, refreshToken } = useAppSelector((state: RootState) => state.auth);
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                if (accessToken && refreshToken) {
                    await dispatch(validateTokenThunk()).unwrap();
                }
            } catch {
                dispatch(logout());
            } finally {
                setIsValidating(false);
            }
        };

        validateAuth();
    }, [accessToken, refreshToken, validateTokenThunk, dispatch]);

    if (isValidating) {
        return <div>Проверка авторизации...</div>;
    }

    if (!accessToken) {
        return <Navigate to='/login' replace />;
    }

    return element;
}
