import { RootState, useAppDispatch, useAppSelector } from '@services/store';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation, useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';

import { BurgerConstructor } from '../../../constructor/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../../ingredients/burger-ingredients/burger-ingredients';

import mpstyle from './main-page.module.css';
import { IngredientDetails } from '@/components/ingredients/ingredient-details/ingredient-details';
import { addIngredient } from '@/services/actions/ingredient/ingredientSlice';

export function MainPage() {
    const dispatch = useAppDispatch();
    const { ingredients, ingredientStatus, selectedIngredients } = useAppSelector((state: RootState) => state.ingredient);
    const { id = null } = useParams();

    const onDrop = (id: string) => {
        dispatch(addIngredient(id));
    };

    useEffect(() => {
        if (selectedIngredients.length > 0) {
            localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
        }
    }, [selectedIngredients]);

    let component = (
        <div className='app'>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor onDrop={onDrop} />
            </DndProvider>
        </div>
    );

    if (useLocation().key === 'default') {
        const ingredient = ingredients.find(item => item.id === id);
        if (ingredient) {
            component = (
                <div className={mpstyle.wrapper}>
                    <IngredientDetails ingredient={ingredient} />
                </div>
            );
        }
    }

    return ingredientStatus === 'success' ? component : <Spinner />;
}
