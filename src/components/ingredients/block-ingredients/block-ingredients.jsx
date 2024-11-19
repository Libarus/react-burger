import ItemIngredients from '../item-ingredients/item-ingredients';

import PropTypes from 'prop-types';

import propTypeIngredient from '../../../shared/types/prop-type-ingredient';

import blistyle from './block-ingredients.module.css';

const BlockIngredients = ({ title, ingredients }) => {
    return (
        <div className='pt-8'>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className={blistyle.ingrBlock}>
                {ingredients.map((item) => {
                    item.badge = item.badge > 5 ? 0 : item.badge;
                    return (
                        <ItemIngredients ingredient={item} key={item.id}/>
                    );
                })}
            </div>
        </div>
    );
};

BlockIngredients.propTypes = {
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(propTypeIngredient).isRequired,
};

export default BlockIngredients;
