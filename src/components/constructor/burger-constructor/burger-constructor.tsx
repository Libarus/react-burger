import { useDrop } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo } from 'react';

import { ActionConstructor } from '../action-constructor/action-constructor';

import { useAppDispatch, useAppSelector } from '../../../services/store';
import { killIngredient } from '../../../services/actions/ingredientSlice';

import { getIngredients } from '../../../shared/utils';
import { Spinner } from '../../../shared/components/spinner/spinner';

import { type TInternalIngredient } from '../../../shared/types/tinternal-ingredient';
import { type TIngredient } from '../../../shared/types/tingredient';

import bcstyle from './burger-constructor.module.css';

type Props = {
    onDrop: (id: string) => void;
};

/**
 * Компонент "Конструктор бургера"
 */
export function BurgerConstructor({ onDrop }: Props) {
    const dispatch = useAppDispatch();

    const { selectedIngredients, ingredientStatus } = useAppSelector((state) => state.ingredient);

    const bun = useMemo(
        () => getIngredients(selectedIngredients.filter((item: TInternalIngredient) => item.type === 'bun'))[0],
        [selectedIngredients],
    );
    const all = useMemo(() => getIngredients(selectedIngredients.filter((item: TInternalIngredient) => item.type !== 'bun')), [selectedIngredients]);

    const [, dropRef] = useDrop({
        accept: 'box',
        drop(item: TIngredient, monitor) {
            if (onDrop) {
                onDrop(item.id);
            }
        },
        // collect: (monitor) => ({
        //     isHover: monitor.isOver(),
        //     canDrop: monitor.canDrop(),
        // }),
    });

    const kill = (id: string, index: number) => {
        dispatch(killIngredient({ id, index }));
    }

    const section = (
        <>
            {bun != null && (
                <>
                    <div className='pl-8 pb-4'>
                        <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                    </div>

                    <div className={`${bcstyle.bcscroll}`} ref={dropRef}>
                        {all.length > 0 ? (
                            all.map((item: TIngredient, index: number) => (
                                <div key={index} className={`${bcstyle.item} pb-4 pr-1`}>
                                    <DragIcon type='primary' className='mr-2' />
                                    <ConstructorElement
                                        isLocked={false}
                                        text={`${item.name}+${index+1}`}
                                        price={item.price}
                                        thumbnail={item.image}
                                        handleClose={() => kill(item.id, index+1)}/>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className='text text_type_main-medium' style={{ textAlign: 'center' }}>
                                    Выберите ингредиенты
                                    <br />
                                    для Вашего бургера 🍔.
                                    <br />
                                    Булку тоже можно заменить.
                                </div>
                                <div className='text text_type_main-small pt-10' style={{ textAlign: 'center' }}>
                                    Перетащите ингредиенты в конструктор
                                </div>
                            </>
                        )}
                    </div>

                    <div className='pl-8 pr-5'>
                        <ConstructorElement type='bottom' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                    </div>

                    <ActionConstructor />
                </>
            )}
        </>
    );

    return (
        <section className={`${bcstyle.bc} pt-25`} ref={dropRef}>
            {ingredientStatus === 'pending' ? <Spinner /> : section}
        </section>
    );
}
