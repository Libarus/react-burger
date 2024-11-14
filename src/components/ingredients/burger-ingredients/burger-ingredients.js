import { useState } from 'react';

import PropTypes from 'prop-types';

import TabIngredients from '../tab-ingredients/tab-ingredients';
import BlockIngredients from '../block-ingredients/block-ingredients';

import bistyle from './burger-ingredients.module.css';

const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = useState('one');

    return (
        <div className={`${bistyle.bi} pt-10`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <TabIngredients current={current} setCurrent={setCurrent} />
            <div className={bistyle.scroll}>
                <BlockIngredients title='Булки' ingredients={ingredients.filter((item) => item.type === 'bun')} />
                <BlockIngredients title='Соусы' ingredients={ingredients.filter((item) => item.type === 'sauce')} />
                <BlockIngredients title='Начинки' ingredients={ingredients.filter((item) => item.type === 'main')} />
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
          price: PropTypes.number,
          image: PropTypes.string,
        })
      ).isRequired,
};


export default BurgerIngredients;
