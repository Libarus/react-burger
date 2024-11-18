import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import TabIngredients from '../tab-ingredients/tab-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';

import propTypeIngredient from '../../../shared/types/prop-type-ingredient';

import bistyle from './burger-ingredients.module.css';

const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = useState('one');

    const bun = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

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
