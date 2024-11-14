import ItemIngredients from '../item-ingredients/item-ingredients';

import blistyle from './block-ingredients.module.css';

const BlockIngredients = ({ title, ingredients }) => {
    return (
        <div className='pt-8'>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className={blistyle.ingrBlock}>
                {ingredients.map((item, index) => (
                        <ItemIngredients key={index} title={item.name} price={item.price} badge={1} image={item.image} />
                    ))}
            </div>
        </div>
    );
};

export default BlockIngredients;
