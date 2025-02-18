import { RootState, useAppDispatch, useAppSelector } from '@services/store';
import { Spinner } from '@shared/components/spinner/spinner';
import { type TIngredient } from '@shared/types/tingredient';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import update from 'immutability-helper';
import { useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ActionConstructor } from '../action-constructor/action-constructor';
import { DraggableElement } from '../draggable-element/draggable-element';

import bcstyle from './burger-constructor.module.css';
import { killIngredient, setNewSelectedIngredients } from '@/services/actions/ingredient/ingredientSlice';

type Props = {
    onDrop: (id: string) => void;
};

/**
 * Компонент "Конструктор бургера"
 */
export function BurgerConstructor({ onDrop }: Props) {
    const dispatch = useAppDispatch();

    const { selectedIngredients, ingredientStatus } = useAppSelector((state: RootState) => state.ingredient);

    const bun = useMemo(() => selectedIngredients.filter((item: TIngredient) => item.type === 'bun')[0], [selectedIngredients]);
    const all = useMemo(() => selectedIngredients.filter((item: TIngredient) => item.type !== 'bun'), [selectedIngredients]);

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
            if (onDrop) {
                onDrop(item.id);
            }
        },
    });

    const onKill = (uuid: string) => {
        dispatch(killIngredient(uuid));
    };

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
        [selectedIngredients, dispatch],
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
                                <DraggableElement key={item.uuid} item={item} index={index} onKill={onKill} onMove={moveBox} klass={bcstyle.item} />
                            ))
                        ) : (
                            <>
                                <div className='text text_type_main-medium' style={{ textAlign: 'center' }}>
                                    Выберите ингредиенты
                                    <br />
                                    для Вашего бургера 🍔.
                                </div>
                                <div className='text text_type_main-default pt-10' style={{ textAlign: 'center' }}>
                                    Булка - ингредиент по-умолчанию.
                                    <br />
                                    Её можно только заменить
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
