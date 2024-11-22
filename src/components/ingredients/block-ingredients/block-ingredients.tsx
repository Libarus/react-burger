import ItemIngredients from '../item-ingredients/item-ingredients';

import type TIngredient from '../../../shared/types/tingredient';

import blistyle from './block-ingredients.module.css';

interface Props {
    title: string;
    ingredients: TIngredient[];
}

/**
 * Компонент "Блок ингредиентов"
 * @param {string} title - заголовок блока
 * @param {TIngredient[]} ingredients - массив ингредиентов
 * @returns {JSX.Element}
 */
const BlockIngredients: React.FC<Props> = ({ title, ingredients }) => {
    return (
        <div className='pt-8'>
            <h2 className='text text_type_main-medium'>{title}</h2>
            <div className={blistyle.ingrBlock}>
                {ingredients.map((item: TIngredient) => {
                    item.badge = item.badge > 5 ? 0 : item.badge;
                    return (
                        <ItemIngredients ingredient={item} key={item.id}/>
                    );
                })}
            </div>
        </div>
    );
};

export default BlockIngredients;