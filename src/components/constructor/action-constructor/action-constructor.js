import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import astyle from './action-constructor.module.css';

const ActionConstructor = () => {
    return (
        <div className={`${astyle.ac} pt-10 pr-4`}>
            <div className={astyle.sizer}>&nbsp;</div>
            <div className='text text_type_digits-medium pr-2'>610</div>
            <div className='pr-10'>
                <CurrencyIcon type='primary' />
            </div>

            <Button htmlType='button' type='primary' size='medium'>
                Оформить заказ
            </Button>
        </div>
    );
};

export default ActionConstructor;
