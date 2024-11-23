import { useState } from 'react';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '../../../shared/components/modal/modal/modal';

import { OrderDetails } from '../order-details/order-details';

import astyle from './action-constructor.module.css';

/**
 * Компонент "Действия в конструкторе" - кнопка "Оформить заказ".
 */
export function ActionConstructor(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
            <div className={`${astyle.ac} pt-10 pr-4`}>
                <div className={astyle.sizer}>&nbsp;</div>
                <div className='text text_type_digits-medium pr-2'>610</div>
                <div className='pr-10'>
                    <CurrencyIcon type='primary' />
                </div>

                <Button htmlType='button' type='primary' size='medium' onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
};
