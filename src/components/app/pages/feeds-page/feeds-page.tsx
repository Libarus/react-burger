import { useEffect } from 'react';

import { Spinner } from '@/shared/components/spinner/spinner';
import { ROUTES } from '@/shared/routes';

import fpstyle from './feeds-page.module.css';
import { FeedList } from '@/components/feed/feed-list/feed-list';
import { FeedStat } from '@/components/feed/feed-stat/feed-stat';
import { connect, disconnect } from '@/services/actions/orderSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/services/store';

export function FeedsPage() {
    const dispatch = useAppDispatch();

    const { message } = useAppSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(connect(process.env.FEED_URL ?? ''));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    return message.orders ? (
        <>
            <div className='app'>
                <div className={fpstyle.wrapper}>
                    <FeedList orders={message.orders} route={ROUTES.FEED} backRoute={ROUTES.FEEDS} />
                </div>
                <div className={fpstyle.wrapper}>
                    <FeedStat message={message} />
                </div>
            </div>
        </>
    ) : (
        <div className='p-10'>
            <Spinner />
        </div>
    );
}
