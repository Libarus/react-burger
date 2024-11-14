import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ActionConstructor from '../action-constructor/action-constructor';

import bcstyle from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients }) => {
    const top = ingredients.find((item) => item.type === 'bun');
    const bottom = ingredients.find((item) => item.type === 'bun');

    return (
        <div className={`${bcstyle.bc} pt-25`}>
            <div className='pl-8 pb-4'>
                <ConstructorElement type='top' isLocked={true} text={top.name} price={top.price} thumbnail={top.image} />
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
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={bottom.text}
                    price={bottom.price}
                    thumbnail={bottom.image}
                />
            </div>

            <ActionConstructor />
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
          price: PropTypes.number,
          image: PropTypes.string,
        })
      ).isRequired,
};

export default BurgerConstructor;
