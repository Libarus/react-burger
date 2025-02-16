import { useEffect } from 'react';

import { Spinner } from '@/shared/components/spinner/spinner';
import { ROUTES } from '@/shared/routes';

import { FeedList } from '@/components/feed/feed-list/feed-list';
import { connect, disconnect } from '@/services/actions/orderSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/services/store';

export function OrdersPage() {
    const dispatch = useAppDispatch();

    const { message } = useAppSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(connect(process.env.ORDER_URL ?? ''));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    return message.orders ? (
        <FeedList orders={message.orders} route={ROUTES.ORDER} backRoute={ROUTES.ORDERS} />
    ) : (
        <div className='p-10'>
            <Spinner />
        </div>
    );
}
