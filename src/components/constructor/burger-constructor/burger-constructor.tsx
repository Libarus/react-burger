import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo } from 'react';

import { ActionConstructor } from '../action-constructor/action-constructor';

import bcstyle from './burger-constructor.module.css';

import { useAppSelector } from '../../../services/store';
import { TInternalIngredient } from '../../../shared/types/tinternal-ingredient';
import { getIngredients } from '../../../shared/utils';
import { Spinner } from '../../../shared/components/spinner/spinner';

/**
 * Компонент "Конструктор бургера"
 */
export function BurgerConstructor() {
    const { ingredients, ingredientStatus } = useAppSelector((store) => store.ingredient);

    const bun = useMemo(() => getIngredients(ingredients.filter((item: TInternalIngredient) => item.type === 'bun'))[0], [ingredients]);

    const section = (
        <>
            {bun != null && (
                <>
                    <div className='pl-8 pb-4'>
                        <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                    </div>

                    <div className={`${bcstyle.bcscroll}`}>
                        {ingredients.map((item: TInternalIngredient, index: number) => (
                            <div key={index} className={`${bcstyle.item} pb-4 pr-1`}>
                                <DragIcon type='primary' className='mr-2' />
                                <ConstructorElement isLocked={false} text={item.name} price={item.price} thumbnail={item.image} />
                            </div>
                        ))}
                    </div>

                    <div className='pl-8 pr-5'>
                        <ConstructorElement type='bottom' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                    </div>

                    <ActionConstructor />
                </>
            )}
        </>
    );

    return <section className={`${bcstyle.bc} pt-25`}>{ingredientStatus === 'pending' ? <Spinner /> : section}</section>;
}
