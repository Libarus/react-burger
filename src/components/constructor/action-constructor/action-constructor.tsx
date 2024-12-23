import { clearSelectedIngredients, saveOrder, setSaveOrderStatus } from '@services/actions/ingredientSlice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { Modal } from '@shared/components/modal/modal/modal';
import { Spinner } from '@shared/components/spinner/spinner';
import { type TIngredient } from '@shared/types/tingredient';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { OrderDetails } from '../order-details/order-details';

import astyle from './action-constructor.module.css';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент "Действия в конструкторе" - кнопка "Оформить заказ".
 */
export function ActionConstructor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectedSumm = useAppSelector(
        state => state.ingredient.selectedIngredients.reduce((acc, item) => acc + item.price, 0) + state.ingredient.selectedIngredients[0].price,
    );

    const { accessToken } = useAppSelector(state => state.auth);
    const { selectedIngredients, saveOrderStatus, saveOrderResponse } = useAppSelector(state => state.ingredient);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        // TODO разобраться
        // @ts-ignore - непонятно почему ругется на отсутствие параметров, требуется 1 параметр, но у меня нет входных параметров
        dispatch(clearSelectedIngredients());
    };

    const sendOrder = () => {

        if (!accessToken) {
            navigate('/login', { replace: true });
            return;
        } 

        const bunId = selectedIngredients[0].id;
        const Ids = [...selectedIngredients.map((si: TIngredient) => si.id), bunId];
        dispatch(saveOrder({ ingredients: Ids }));
    };

    useEffect(() => {
        dispatch(setSaveOrderStatus('idle'));
        if (saveOrderStatus === 'success' && saveOrderResponse.success) {
            openModal();
        }
    }, [saveOrderStatus, saveOrderResponse, dispatch]);

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails saveOrderResponse={saveOrderResponse} />
                </Modal>
            )}
            <div className={`${astyle.ac} pt-10 pr-4`}>
                <div className={astyle.sizer}>&nbsp;</div>
                <div className='text text_type_digits-medium pr-2'>{selectedSumm}</div>
                <div className='pr-10'>
                    <CurrencyIcon type='primary' />
                </div>

                {saveOrderStatus == 'pending' ? (
                    <Spinner />
                ) : (
                    <Button htmlType='button' type='primary' size='medium' onClick={sendOrder}>
                        Оформить заказ
                    </Button>
                )}
            </div>
        </>
    );
}
