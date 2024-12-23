import { loadIngredients } from '@services/actions/ingredientSlice';
import { RootState, useAppDispatch, useAppSelector } from '@services/store';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';
import { TError } from '@/shared/types/terror';

import { AppHeader } from '../../header/app-header/app-header';

import { getUserThunk, logout } from '@/services/actions/authSlice';

//import rlstyles from './root-layout.module.css';

export function RootLayout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { accessToken } = useAppSelector((state: RootState) => state.auth);
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                if (accessToken) {
                    await dispatch(getUserThunk()).unwrap();
                }
            } catch (e: unknown) {
                const err = e as TError;
                dispatch(logout());
                console.error('No update user data', err.message);
                navigate('/login', { replace: true });
            } finally {
                setIsValidating(false);
            }
        };

        validateAuth();
    }, [accessToken, dispatch, navigate]);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    if (isValidating) {
        return <Spinner />;
    }

    const main = (
        <main>
            <AppHeader />
            <div className='app'>
                <Outlet />
            </div>
        </main>
    );

    return <>{main}</>;
}
