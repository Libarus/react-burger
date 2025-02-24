import { TFeedOrder } from '@/shared/types/tfeed-order';
import { type TMessage } from '@/shared/types/tmessage';

import fsstyle from './feed-stat.module.css';

type Props = {
    message: TMessage;
};

export function FeedStat({ message }: Props) {
    return (
        <div className={fsstyle.scroll}>
            <div className={`${fsstyle.tabs} mt-10 pt-4`}>
                <div className={`${fsstyle.column}`}>
                    <div className=' text text_type_main-medium mb-6'>Готовы:</div>
                    <div className={`${fsstyle.multiColumn}`}>
                        <ul className={`text text_type_digits-default ${fsstyle.type1}`}>
                            {message?.orders
                                .filter(order => order.status === 'done')
                                .map((order: TFeedOrder, index: number) => <li key={index}>{order.number}</li>)}
                        </ul>
                    </div>
                </div>
                <div className={`${fsstyle.column}`}>
                    <div className=' text text_type_main-medium mb-6'>В работе:</div>
                    <div className={`${fsstyle.multiColumn}`}>
                        <ul className={`text text_type_digits-default`}>
                            {message.orders
                                .filter(order => order.status === 'pending')
                                .map((order: TFeedOrder, index: number) => (
                                    <li key={index}>{order.number}</li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div className='text text_type_main-medium pt-15'>Выполнено за все время:</div>
                <div className='text text_type_digits-large pt-3'>{message.total}</div>
            </div>

            <div>
                <div className='text text_type_main-medium pt-15'>Выполнено за сегодня:</div>
                <div className='text text_type_digits-large pt-3'>{message.totalToday}</div>
            </div>
        </div>
    );
}
