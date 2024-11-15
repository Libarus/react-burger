import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import iistyle from './item-ingredients.module.css';

const ItemIngredients = ({ title, price, badge, image }) => {
    return (
        <div className={`pl-4 pr-4 pt-6 pb-2 ${iistyle.ingrItem}`}>
            <div className={`pl-4 pr-4 ${iistyle.ingrContainer}`}>
                {badge < 1 && <Counter count={badge} size='default' extraClass='m-1' />}
                <div>
                    <img src={image} alt='bulka' />
                </div>
                <div className={iistyle.priceContainer}>
                    <div className={`text text_type_digits-default ${iistyle.priceBlock}`}>{price}</div>
                    <div className={`pt-1 ${iistyle.priceBlock}`}>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
                <div className={`text text_type_main-default pt-3 ${iistyle.textCenter}`}>{title}</div>
            </div>
        </div>
    );
};

export default ItemIngredients;
