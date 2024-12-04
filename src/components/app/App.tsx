import { useEffect } from 'react';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { AppHeader } from '../header/app-header/app-header';
import { BurgerConstructor } from '../constructor/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../ingredients/burger-ingredients/burger-ingredients';

import { loadIngredients } from '../../services/actions/ingredientSlice';
import { useAppDispatch } from '../../services/store';

import './App.css';

/**
 * Компонент App - корневой компонент приложения.
 */
function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    return (
        <main>
            <AppHeader />
            <div className='app'>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </main>
    );
}

export default App;
