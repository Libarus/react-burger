import { useState, useMemo, FC } from 'react';

import TabIngredients from '../tab-ingredients/tab-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';

import type TIngredient from '../../../shared/types/tingredient';

import bistyle from './burger-ingredients.module.css';

interface Props {
    ingredients: TIngredient[]
}

/**
 * Компонент "Список ингредиентов"
 * @param {TIngredient[]} ingredients - массив ингредиентов
 * @returns {JSX.Element}
 */
const BurgerIngredients: FC<Props> = ({ ingredients }) => {
    const [current, setCurrent] = useState('one');

    const ingredientsByType = useMemo(() => {
        const result: Record<string, TIngredient[]> = {};

        ['bun', 'sauce', 'main'].forEach((type) => {
            result[type] = ingredients.filter((item) => item.type === type);
        });

        return result;
    }, [ingredients]);

    const { bun, sauce, main } = ingredientsByType;

    return (
        <section className={`${bistyle.bi} pt-10`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <TabIngredients current={current} setCurrent={setCurrent} />
            <div className={bistyle.scroll}>
                <BlockIngredients title='Булки' ingredients={bun} />
                <BlockIngredients title='Соусы' ingredients={sauce} />
                <BlockIngredients title='Начинки' ingredients={main} />
            </div>
        </section>
    );
};

export default BurgerIngredients;
