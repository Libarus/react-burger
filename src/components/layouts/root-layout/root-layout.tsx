import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { loadIngredients } from '@services/actions/ingredientSlice';
import { useAppDispatch } from '@services/store';
import { AppHeader } from '../../header/app-header/app-header';

//import rlstyles from './root-layout.module.css';

export function RootLayout() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    }, [loadIngredients, dispatch]);

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
