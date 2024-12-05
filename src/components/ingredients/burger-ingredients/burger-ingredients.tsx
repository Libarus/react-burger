import { useEffect, useMemo, useRef } from 'react';

import { BlockIngredients } from '../block-ingredients/block-ingredients';
import { TabIngredients } from '../tab-ingredients/tab-ingredients';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { Spinner } from '../../../shared/components/spinner/spinner';

import { type TIngredient } from '../../../shared/types/tingredient';
import { type TInternalIngredient } from '../../../shared/types/tinternal-ingredient';

import { getIngredients } from '../../../shared/utils';
import { setBun, setCurrentTab } from '../../../services/actions/ingredientSlice';

import bistyle from './burger-ingredients.module.css';

/**
 * Компонент "Список ингредиентов"
 */
export function BurgerIngredients() {
    const dispatch = useAppDispatch();
    const { ingredients, ingredientStatus, currentTab } = useAppSelector((store) => store.ingredient);
    const ingredientTabName = ['bun', 'sauce', 'main'];
    const offset = 200; // сдвиг определения ближайшего элемента

    const scroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.target as HTMLDivElement;
        const t = target.scrollTop;
        const bunY = (bunRef.current?.offsetTop == undefined ? 0 : bunRef.current?.offsetTop) - offset;
        const sauceY = (sauceRef.current?.offsetTop == undefined ? 0 : sauceRef.current?.offsetTop) - offset;
        const mainY = (mainRef.current?.offsetTop == undefined ? 0 : mainRef.current?.offsetTop) - offset;

        const values = [Math.abs(t - bunY), Math.abs(t - sauceY), Math.abs(t - mainY)];
        const min = Math.min(...values);
        const minIndex = values.indexOf(min);

        dispatch(setCurrentTab(ingredientTabName[minIndex]));
    };

    useEffect(() => {
        if (ingredients.length === 0) return;
        dispatch(setBun(ingredients.filter((item: TInternalIngredient) => item.type === 'bun')[0]));
    }, [ingredients]);

    const ingredientsByType = useMemo(() => {
        const result: Record<string, TIngredient[]> = {};

        ingredientTabName.forEach((type) => {
            result[type] = getIngredients(ingredients.filter((item: TInternalIngredient) => item.type === type));
        });

        return result;
    }, [ingredients]);

    const { bun, sauce, main } = ingredientsByType;

    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const section = (
        <>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <TabIngredients current={currentTab} />
            <div className={bistyle.scroll} onScroll={scroll}>
                <BlockIngredients title='Булки' ingredients={bun} name='bun' ref={bunRef} />
                <BlockIngredients title='Соусы' ingredients={sauce} name='sauce' ref={sauceRef} />
                <BlockIngredients title='Начинки' ingredients={main} name='main' ref={mainRef} />
            </div>
        </>
    );

    return (
        <section className={`${bistyle.bi} pt-10`}>
            {ingredientStatus === 'pending' ? (
                <div className='pt-15'>
                    <Spinner />
                </div>
            ) : (
                section
            )}
        </section>
    );
}
