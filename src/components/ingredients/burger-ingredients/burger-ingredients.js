import { useState } from 'react';

import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import bistyle from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one');

    return (
        <div className={`${bistyle.bi} mr-4 pt-10`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='pt-5 pb-2'>
                <Tab value='one' active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value='two' active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value='three' active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className='pt-8'>
                <h2 className='text text_type_main-medium'>Булки</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {Array(5)
                        .fill(0)
                        .map((k, index) => (
                            <div key={index} style={{ backgroundColor: 'red', flex: '0 1 calc(50% - 32px)' }} className='pl-4 pr-4 pt-6 pb-2'>
                                <div style={{ backgroundColor: 'green', position: 'relative' }} className='pl-4 pr-4'>
                                    <Counter count={1} size='default' extraClass='m-1' />
                                    <div>
                                        <img src='./ingredients/bulka.png' alt='bulka' style={{ width: '100%' }} />
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
                                        <div className='text text_type_digits-default'>1234567890</div>
                                        <CurrencyIcon type='primary' />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BurgerIngredients;
