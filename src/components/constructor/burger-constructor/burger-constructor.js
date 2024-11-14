import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ActionConstructor from '../action-constructor/action-constructor';

import bcstyle from './burger-constructor.module.css';

const elements = [
    {
        text: 'Краторная булка N-200i (верх)',
        price: 200,
        thumbnail: 'bulka',
    },
    {
        text: 'Соус традиционный галактический',
        price: 30,
        thumbnail: 'sous',
    },
    {
        text: 'Мясо бессмертных моллюсков Protostomia',
        price: 300,
        thumbnail: 'meat',
    },
    {
        text: 'Плоды Фалленианского дерева',
        price: 80,
        thumbnail: 'plod',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Соус традиционный галактический',
        price: 30,
        thumbnail: 'sous',
    },
    {
        text: 'Мясо бессмертных моллюсков Protostomia',
        price: 300,
        thumbnail: 'meat',
    },
    {
        text: 'Плоды Фалленианского дерева',
        price: 80,
        thumbnail: 'plod',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Краторная булка N-200i (верх)',
        price: 200,
        thumbnail: 'bulka',
    },
];

const BurgerConstructor = () => {
    const top = elements[0];
    const bottom = elements[elements.length - 1];

    return (
        <div className={`${bcstyle.bc} pt-25 ml-4 pr-4`}>
            <div >
                <div className='pl-8 pr-5 pb-4'>
                    <ConstructorElement type='top' isLocked={true} text={top.text} price={top.price} thumbnail={`./ingredients/${top.thumbnail}.png`} />
                </div>

                <div className={`${bcstyle.bcscroll}`}>
                    {elements.slice(1, elements.length - 2).map((element, index) => (
                        <div key={index} className={`${bcstyle.item} pb-4 pr-1`}>
                            <DragIcon type='primary' className='mr-2' />
                            <ConstructorElement
                                isLocked={false}
                                text={element.text}
                                price={element.price}
                                thumbnail={`./ingredients/${element.thumbnail}.png`}
                            />
                        </div>
                    ))}
                </div>

                <div className='pl-8 pr-5'>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={bottom.text}
                        price={bottom.price}
                        thumbnail={`./ingredients/${bottom.thumbnail}.png`}
                    />
                </div>

                <ActionConstructor />

            </div>
        </div>
    );
};

export default BurgerConstructor;
