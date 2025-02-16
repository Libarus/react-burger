import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { type TIngredient } from '@/shared/types/tingredient';

import iistyle from './ingredient-item.module.css';

type Props = {
    ingredient: TIngredient | null;
    countIngredients: number;
};

export function IngridientItem({ ingredient, countIngredients }: Props) {
    if (!ingredient) return null;

    return (
        <div className={iistyle.wrapper}>
            <div className={iistyle.ingrImage}>
                <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className={`${iistyle.ingrPrice}`}>
                <div className='text text_type_main-default'>{ingredient.name}</div>
                <div className='text text_type_main-medium'>
                    {countIngredients}&nbsp;x&nbsp;{ingredient.price}&nbsp;
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
}
