import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { type TFeedOrder, statusText } from '@/shared/types/tfeed-order';
import { type TIngredient } from '@/shared/types/tingredient';

import fistyle from './feed-item.module.css';
import { IngridientItem } from './ingredient-item/ingredient-item';

type Props = {
    order: TFeedOrder | null;
    ingredients: TIngredient[];
};

export function FeedItem({ order, ingredients }: Props) {
    const summ = order?.ingredients.reduce((acc: number, id: string) => {
        acc += ingredients.filter((ingr: TIngredient) => ingr.id == id)[0].price;
        return acc;
    }, 0);

    const ids = [...new Set(order?.ingredients)];
    const ingrs = ingredients.filter((ingr: TIngredient) => ids.includes(ingr.id));

    if (order == null) return null;

    return (
        <>
            <div className='text text_type_digits-default text-center'>#{order.number}</div>
            <div className='text text_type_main-medium pt-10'>{order.name}</div>
            <div className={`text text_type_main-small pt-3 ${fistyle.statusColor}`}>{statusText[order.status]}</div>
            <div className='text text_type_main-medium pt-10 pb-6'>Состав:</div>

            <div className={`pt-6 ${fistyle.scroll} pr-3`}>
                {ids.map((id: string, index: number) => {
                    const ingredient = ingrs.find((ingr: TIngredient) => ingr.id === id) || null;
                    const countIngredients = order.ingredients.filter((ingr: string) => ingr === id).length;
                    return (
                        <div key={index}>
                            <IngridientItem ingredient={ingredient} countIngredients={countIngredients} />
                        </div>
                    );
                })}
            </div>

            <div className={`${fistyle.itog} pt-10`}>
                <div className='text text_type_main-small text_color_inactive pt-2'>
                    <FormattedDate date={new Date(order.createdAt)} />
                </div>
                <div className='text text_type_main-medium'>
                    {summ}&nbsp;
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </>
    );
}
