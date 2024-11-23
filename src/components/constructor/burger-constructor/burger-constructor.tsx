import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo } from 'react';

import { ActionConstructor } from '../action-constructor/action-constructor';

import type TIngredient from '../../../shared/types/tingredient';

import bcstyle from './burger-constructor.module.css';

interface Props {
    ingredients: TIngredient[];
}

/**
 * Компонент "Конструктор бургера"
 */
export function BurgerConstructor({ ingredients }: Props) {
    const bun = useMemo(() => ingredients.find((item: TIngredient) => item.type === 'bun'), [ingredients]);

    return (
        <section className={`${bcstyle.bc} pt-25`}>
            {bun != null && (
                <>
                    <div className='pl-8 pb-4'>
                        <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                    </div>

                    <div className={`${bcstyle.bcscroll}`}>
                        {ingredients.map((item: TIngredient, index: number) => (
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
            {bun == null && <div>Выберите ингредиенты</div>}
        </section>
    );
};
