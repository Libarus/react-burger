import odstyle from './order-details.module.css';

import done from '../../../images/done.png';

const OrderDetails = () => {

    const orderNumber = Math.round(Math.random() * 100000);

    return (
        <div className={odstyle.od}>
            <div className='text text_type_digits-large'>{orderNumber.toString().padStart(6, '0')}</div>
            <div className='text text_type_main-default pt-4 pb-15'>идентификатор заказа</div>
            <div><img src={done} alt='done' className={odstyle.done} /></div>
            <div className='text text_type_main-default pt-15'>Ваш заказ начали готовить</div>
            <div className='text text_type_main-default pt-2 pb-10 text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
        </div>
    )
}

export default OrderDetails;