import { useDrop } from 'react-dnd';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { useCallback, useMemo } from 'react';

import { ActionConstructor } from '../action-constructor/action-constructor';

import { useAppDispatch, useAppSelector } from '../../../services/store';
import { killIngredient, setNewSelectedIngredients } from '../../../services/actions/ingredientSlice';

import { getIngredients } from '../../../shared/utils';
import { Spinner } from '../../../shared/components/spinner/spinner';

import { type TInternalIngredient } from '../../../shared/types/tinternal-ingredient';
import { type TIngredient } from '../../../shared/types/tingredient';

import bcstyle from './burger-constructor.module.css';
import { DraggableElement } from '../draggable-element/draggable-element';
import update from 'immutability-helper';

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
        () => selectedIngredients.filter((item: TIngredient) => item.type === 'bun')[0],
        [selectedIngredients],
    );
    const all = useMemo(() => selectedIngredients.filter((item: TIngredient) => item.type !== 'bun'), [selectedIngredients]);

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
            if (onDrop) {
                onDrop(item.id);
            }
        },
    });

    const onKill = (id: string, index: number) => {
        dispatch(killIngredient({ id, index }));
    }

    const moveBox = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const draggedBox = selectedIngredients[dragIndex];
            const dd = update(selectedIngredients, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, draggedBox],
                ],
            });
            dispatch(setNewSelectedIngredients(dd));
        },
        [selectedIngredients, dispatch]
    );

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
                                <DraggableElement key={`${item.id}_${index}`} item={item} index={index} onKill={onKill} onMove={moveBox} klass={bcstyle.item} />
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
