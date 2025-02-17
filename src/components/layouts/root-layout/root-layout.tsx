import { loadIngredients, setSelectedIngredients } from '@/services/actions/ingredient/ingredientSlice';
import { useAppDispatch } from '@services/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { AppHeader } from '../../header/app-header/app-header';

export function RootLayout() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(loadIngredients());

        const temp = localStorage.getItem('selectedIngredients');
        if (temp !== null) dispatch(setSelectedIngredients(JSON.parse(temp)));
    }, [dispatch]);

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
