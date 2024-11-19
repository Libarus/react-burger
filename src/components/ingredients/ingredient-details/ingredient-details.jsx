import PropTypes from 'prop-types';

import propTypeIngredient from '../../../shared/types/prop-type-ingredient';

import idstyle from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
    return (
        <div className={idstyle.ingrDetails}>
            <div>
                <img src={ingredient.image} alt={ingredient.title} />
            </div>
            <div className="text text_type_main-medium pb-10">{ingredient.name}</div>
            <div className={`${idstyle.ingrInfo} pl-10 pr-10`}>
                <div>
                    <div className="text text_type_main-default text_color_inactive">Калории,ккал:</div>
                    <div className='text text_type_digits-default pt-3 text_color_inactive'>{ingredient.calories}</div>
                </div>
                <div>
                    <div className="text text_type_main-default text_color_inactive">Белки, г:</div>
                    <div className='text text_type_digits-default pt-3 text_color_inactive'>{ingredient.proteins}</div>
                </div>
                <div>
                    <div className="text text_type_main-default text_color_inactive">Жиры, г:</div>
                    <div className='text text_type_digits-default pt-3 text_color_inactive'>{ingredient.fat}</div>
                </div>
                <div>
                    <div className="text text_type_main-default text_color_inactive">Углеводы, г:</div>
                    <div className='text text_type_digits-default pt-3 text_color_inactive'>{ingredient.carbohydrates}</div>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.objectOf(propTypeIngredient).isRequired,
};

export default IngredientDetails;
