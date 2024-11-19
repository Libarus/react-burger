import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import TabIngredients from '../tab-ingredients/tab-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';

import propTypeIngredient from '../../../shared/types/prop-type-ingredient';

import bistyle from './burger-ingredients.module.css';

const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = useState('one');

    const ingredientsByType = useMemo(() => {
        const result = {};

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

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(propTypeIngredient).isRequired,
};

export default BurgerIngredients;
