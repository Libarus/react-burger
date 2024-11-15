import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import ActionConstructor from '../action-constructor/action-constructor';

import propTypeIngredient from '../../../shared/types/prop-type-ingredient';

import bcstyle from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients }) => {
    const bun = useMemo(() => ingredients.find((item) => item.type === 'bun'), [ingredients]);

    return (
        <div className={`${bcstyle.bc} pt-25`}>
            <div className='pl-8 pb-4'>
                <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
            </div>

            <div className={`${bcstyle.bcscroll}`}>
                {ingredients.map((item, index) => (
                    <div key={index} className={`${bcstyle.item} pb-4 pr-1`}>
                        <DragIcon type='primary' className='mr-2' />
                        <ConstructorElement isLocked={false} text={item.name} price={item.price} thumbnail={item.image} />
                    </div>
                ))}
            </div>

            <div className='pl-8 pr-5'>
                <ConstructorElement type='bottom' isLocked={true} text={bun.text} price={bun.price} thumbnail={bun.image} />
            </div>

            <ActionConstructor />
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(propTypeIngredient).isRequired,
};

export default BurgerConstructor;
