import React from 'react';

import { type TIngredient } from '@shared/types/tingredient';
import { ItemIngredients } from '../item-ingredients/item-ingredients';

import blistyle from './block-ingredients.module.css';

interface Props {
    title: string;
    ingredients: TIngredient[];
    selectedIngredients: TIngredient[];
    name: string;
}

/**
 * Компонент "Блок ингредиентов"
 */
export const BlockIngredients = React.forwardRef<HTMLDivElement, Props>(({ title, ingredients, selectedIngredients, name }, refBlock) => {
    return (
        <div className='pt-8' id={`ingredients_${name}`} ref={refBlock}>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className={blistyle.ingrBlock}>
                {ingredients.map((item: TIngredient, index) => {
                    const badge = selectedIngredients.filter((si: TIngredient) => si.id === item.id).length;
                    return <ItemIngredients ingredient={item} key={`${item.id}_${index}`} badge={badge} />;
                })}
            </div>
        </div>
    );
});
