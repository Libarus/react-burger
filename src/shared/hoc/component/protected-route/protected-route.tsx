import { RootState, useAppDispatch, useAppSelector } from '@services/store';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';

import { getUserThunk, logout, validateTokenThunk } from '@/services/actions/auth/authSlice';
import { TokenService } from '@/services/token.service';

interface ProtectedRouteProps {
    element: JSX.Element;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user } = useAppSelector((state: RootState) => state.auth);

    const [isValidating, setIsValidating] = useState<boolean>(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                if (TokenService.GetAccessToken() && TokenService.GetRefreshToken()) {
                    await dispatch(validateTokenThunk()).unwrap();
                    await dispatch(getUserThunk()).unwrap();
                }
            } catch {
                dispatch(logout());
                TokenService.ClearTokens();
                navigate('/login', { replace: true });
            } finally {
                setIsValidating(false);
            }
        };

        validateAuth();
    }, [dispatch, navigate]);

    useEffect(() => {
        if (user != null) localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    if (isValidating) {
        return (
            <div className='p-10'>
                <Spinner />
            </div>
        );
    }

    if (!TokenService.GetAccessToken()) {
        return <Navigate to='/login' replace />;
    }

    return element;
}
