import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@/shared/components/modal/modal/modal';
import { TFeedOrder } from '@/shared/types/tfeed-order';

import { FeedItem } from '../feed-item/feed-item';
import { FeedListItem } from '../feed-list-item/feed-list-item';

import flstyle from './feed-list.module.css';
import { RootState, useAppSelector } from '@/services/store';

type Props = {
    orders: TFeedOrder[];
    route: string;
    backRoute: string;
};

export function FeedList({ orders = [], route, backRoute }: Props) {
    const navigate = useNavigate();

    const { id: orderId } = useParams();

    const { ingredients } = useAppSelector((state: RootState) => state.ingredient);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = useCallback(
        (id: string) => {
            navigate(route.replace(':id', orderId ? orderId : id));
            setIsModalOpen(true);
        },
        [navigate, route, orderId],
    );

    const closeModal = () => {
        navigate(backRoute);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (orderId != undefined) {
            openModal(orderId || '');
        }
    }, [orderId, openModal]);

    const feedItem = <FeedItem order={orders.find(item => item._id == orderId) || null} ingredients={ingredients} />;

    const modal = isModalOpen && <Modal onClose={closeModal}>{feedItem}</Modal>;

    return (
        <>
            {modal}
            <h1 className='text text_type_main-large mb-4'>Лента заказов</h1>
            <div className={`${flstyle.scroll}`}>
                {orders.length == 0
                    ? 'Заказы отсутствуют'
                    : orders.map((order: TFeedOrder) => {
                          const images: string[] = [];
                          const summ = order.ingredients.reduce((acc: number, id: string) => {
                              const ingr = ingredients.find(item => item.id === id);
                              if (ingr) {
                                  images.push(ingr.image);
                                  return acc + ingr.price;
                              }
                              return acc;
                          }, 0);
                          return <FeedListItem key={order.number} order={order} summ={summ} images={images} onOpenModel={openModal} />;
                      })}
            </div>
        </>
    );
}
