import { useState } from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../../../shared/components/modal/modal/modal';

import IngredientDetails from '../ingredient-details/ingredient-details';

import iistyle from './item-ingredients.module.css';
import type TIngredient from '../../../shared/types/tingredient';

interface Props {
    ingredient: TIngredient;
}

/**
 * Компонент "Ингредиент"
 * @param {TIngredient} ingredient - ингредиент
 * @returns {JSX.Element}
 */
const ItemIngredients: React.FC<Props> = ({ ingredient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && (
                <Modal header='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
            <div className={`pl-4 pr-4 pt-6 pb-2 ${iistyle.ingrItem}`}>
                <div className={iistyle.ingrAbout} onClick={openModal}>
                    <div className={`pl-4 pr-4 ${iistyle.ingrContainer}`}>
                        {ingredient.badge > 0 && <Counter count={ingredient.badge} size='default' extraClass='m-1' />}
                        <div>
                            <img src={ingredient.image} alt={ingredient.name} className={iistyle.ingrImage} />
                        </div>
                        <div className={iistyle.priceContainer}>
                            <div className={`text text_type_digits-default ${iistyle.priceBlock}`}>{ingredient.price}</div>
                            <div className={`pt-1 ${iistyle.priceBlock}`}>
                                <CurrencyIcon type='primary' />
                            </div>
                        </div>
                        <div className={`text text_type_main-default pt-3 ${iistyle.textCenter} ${iistyle.ingrName}`}>ingredient.name</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemIngredients;
