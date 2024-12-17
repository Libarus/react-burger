import { useEffect } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loadIngredients } from '../../services/actions/ingredientSlice';
import { useAppDispatch } from '../../services/store';
import { routeConfig } from '../../shared/routes';

// import { BurgerConstructor } from '../constructor/burger-constructor/burger-constructor';
// import { AppHeader } from '../header/app-header/app-header';
// import { BurgerIngredients } from '../ingredients/burger-ingredients/burger-ingredients';

import './App.css';

const router = createBrowserRouter(routeConfig);

/**
 * Компонент App - корневой компонент приложения.
 */
function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    // const onDrop = (id: string) => {
    //     dispatch(addIngredient(id));
    // };

    return <RouterProvider router={router} />;

    /*
    return (
        <main>
            <AppHeader />
            <div className='app'>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor onDrop={onDrop} />
                </DndProvider>
            </div>
        </main>
    );
    */
}

export default App;
