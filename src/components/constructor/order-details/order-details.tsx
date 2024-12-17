import done from '../../../assets/images/done.png';
import { type TOrderResponse } from '../../../shared/types/torder';

import odstyle from './order-details.module.css';

type Props = {
    saveOrderResponse: TOrderResponse;
};

/**
 * Компонент "Детали заказа"
 * Отображает детали заказа (номер, статус)
 */
export function OrderDetails({ saveOrderResponse }: Props) {
    return (
        <div className={odstyle.od}>
            <div className='text text_type_digits-large'>{saveOrderResponse.order.number.toString().padStart(6, '0')}</div>
            <div className='text text_type_main-default pt-4 pb-15'>идентификатор заказа</div>
            <div>
                <img src={done} alt='done' className={odstyle.done} />
            </div>
            <div className='text text_type_main-large pt-15'>{saveOrderResponse.name}</div>
            <div className='text text_type_main-default pt-15'>Ваш заказ начали готовить</div>
            <div className='text text_type_main-default pt-2 pb-10 text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
        </div>
    );
}
