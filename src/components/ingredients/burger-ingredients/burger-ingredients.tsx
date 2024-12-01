import { useMemo } from 'react';

import { BlockIngredients } from '../block-ingredients/block-ingredients';
import { TabIngredients } from '../tab-ingredients/tab-ingredients';
import { useAppSelector } from '../../../services/store';
import { Spinner } from '../../../shared/components/spinner/spinner';

import { type TIngredient } from '../../../shared/types/tingredient';
import { type TInternalIngredient } from '../../../shared/types/tinternal-ingredient';

import bistyle from './burger-ingredients.module.css';
import { getIngredients } from '../../../shared/utils';

/**
 * Компонент "Список ингредиентов"
 */
export function BurgerIngredients() {
    const { ingredients, ingredientStatus, currentTab } = useAppSelector((store) => store.ingredient);

    const ingredientsByType = useMemo(() => {
        const result: Record<string, TIngredient[]> = {};

        ['bun', 'sauce', 'main'].forEach((type) => {
            result[type] = getIngredients(ingredients.filter((item: TInternalIngredient) => item.type === type));
        });

        return result;
    }, [ingredients]);

    const { bun, sauce, main } = ingredientsByType;

    const section = (
        <section className={`${bistyle.bi} pt-10`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <TabIngredients current={currentTab} />
            <div className={bistyle.scroll}>
                <BlockIngredients title='Булки' ingredients={bun} name='bun' />
                <BlockIngredients title='Соусы' ingredients={sauce} name='sauce' />
                <BlockIngredients title='Начинки' ingredients={main} name='main' />
            </div>
        </section>
    );

    return <>{ingredientStatus === 'pending' ? <Spinner /> : section}</>;
}
