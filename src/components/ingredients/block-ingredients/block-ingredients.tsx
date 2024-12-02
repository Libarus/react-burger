import React from 'react';

import { ItemIngredients } from '../item-ingredients/item-ingredients';

import { type TIngredient } from '../../../shared/types/tingredient';

import blistyle from './block-ingredients.module.css';

interface Props {
    title: string;
    ingredients: TIngredient[];
    name: string;
}

/**
 * Компонент "Блок ингредиентов"
 */
export const BlockIngredients = React.forwardRef<HTMLDivElement, Props>(({ title, ingredients, name }, refBlock) => {
    return (
        <div className='pt-8' id={`ingredients_${name}`} ref={refBlock}>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className={blistyle.ingrBlock}>
                {ingredients.map((item: TIngredient) => {
                    return <ItemIngredients ingredient={item} key={item.id} />;
                })}
            </div>
        </div>
    );
});
