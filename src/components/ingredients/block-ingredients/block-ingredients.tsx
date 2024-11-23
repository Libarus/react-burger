import { ItemIngredients } from '../item-ingredients/item-ingredients';

import type TIngredient from '../../../shared/types/tingredient';

import blistyle from './block-ingredients.module.css';

interface Props {
    title: string;
    ingredients: TIngredient[];
}

/**
 * Компонент "Блок ингредиентов"
 */
export function BlockIngredients({ title, ingredients }: Props) {
    return (
        <div className='pt-8'>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className={blistyle.ingrBlock}>
                {ingredients.map((item: TIngredient) => {
                    item.badge = item.badge > 5 ? 0 : item.badge;
                    return (
                        <ItemIngredients ingredient={item} key={item.id}/>
                    );
                })}
            </div>
        </div>
    );
};

