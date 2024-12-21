import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { addIngredient } from '@services/actions/ingredientSlice';
import { useAppDispatch } from '@services/store';
import { BurgerConstructor } from '../../../constructor/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../../ingredients/burger-ingredients/burger-ingredients';

export function MainPage() {
    const dispatch = useAppDispatch();

    const onDrop = (id: string) => {
        dispatch(addIngredient(id));
    };

    return (
        <>
            <div className='app'>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor onDrop={onDrop} />
                </DndProvider>
            </div>
        </>
    );
}
