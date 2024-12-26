import { loadIngredients, setSelectedIngredients } from '@services/actions/ingredientSlice';
import { useAppDispatch } from '@services/store';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';
import { TError } from '@/shared/types/terror';

import { AppHeader } from '../../header/app-header/app-header';

import { getUserThunk, logout } from '@/services/actions/authSlice';
import { TokenService } from '@/services/token.service';

//import rlstyles from './root-layout.module.css';

export function RootLayout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isValidating, setIsValidating] = useState<boolean>(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                if (TokenService.GetAccessToken()) {
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
    }, [dispatch, navigate]);

    useEffect(() => {
        dispatch(loadIngredients());

        const temp = localStorage.getItem('selectedIngredients');
        if (temp !== null) dispatch(setSelectedIngredients(JSON.parse(temp)));
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
