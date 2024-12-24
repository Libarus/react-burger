import { clearSelectedIngredients, saveOrder, setSaveOrderStatus } from '@services/actions/ingredientSlice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { Modal } from '@shared/components/modal/modal/modal';
import { Spinner } from '@shared/components/spinner/spinner';
import { type TIngredient } from '@shared/types/tingredient';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderDetails } from '../order-details/order-details';

import astyle from './action-constructor.module.css';
import { TokenService } from '@/services/token.service';

/**
 * Компонент "Действия в конструкторе" - кнопка "Оформить заказ".
 */
export function ActionConstructor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectedSumm = useAppSelector(
        state => state.ingredient.selectedIngredients.reduce((acc, item) => acc + item.price, 0) + state.ingredient.selectedIngredients[0].price,
    );

    const { selectedIngredients, saveOrderStatus, saveOrderResponse } = useAppSelector(state => state.ingredient);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(clearSelectedIngredients(undefined));
    };

    const sendOrder = () => {
        dispatch(setSaveOrderStatus('idle'));

        if (!TokenService.GetAccessToken()) {
            navigate('/login', { replace: true });
            return;
        }

        const bunId = selectedIngredients[0].id;
        const Ids = [...selectedIngredients.map((si: TIngredient) => si.id), bunId];
        dispatch(saveOrder({ ingredients: Ids }));
    };

    useEffect(() => {
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

                {saveOrderStatus === 'pending' ? (
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
