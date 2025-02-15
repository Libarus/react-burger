import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TFeedOrder } from '@/shared/types/tfeed-order';
import { formatDate } from '@/shared/utils';

import flistyle from './feed-list-item.module.css';

type Props = {
    order: TFeedOrder;
    summ: number;
    images: string[];
    onOpenModel: (id: string) => void;
};

export function FeedListItem({ order, summ, images, onOpenModel }: Props) {
    const countImages = images.length - 5;

    return (
        <>
            <div className={`p-6 ${flistyle.item} mb-4 mr-2`} onClick={() => onOpenModel(order._id)}>
                <div className={`${flistyle.numDate} mb-6`}>
                    <div className='text text_type_digits-default'>#{order.number}</div>
                    <div className='text text_type_main-small text_color_inactive'>{formatDate(order.createdAt)}</div>
                </div>

                <div className='mb-6 text text_type_main-medium'>{order.name}</div>

                <div className={`${flistyle.ingrPrice}`}>
                    <div className={`pr-6 ${flistyle.ingrImages}`}>
                        {images.map((image, index) => {
                            if (index > 5) return null;

                            const img = (
                                <div key={index}>
                                    <img src={image} style={{ zIndex: `${100 - index}` }} />
                                </div>
                            );

                            if (index < 5) return img;

                            return countImages == 1 ? (
                                img
                            ) : (
                                <div className={flistyle.sixElement} key={index}>
                                    <img src={image} style={{ zIndex: '50' }} />
                                    <span className={`text text_type_digits-default ${flistyle.number}`}>+{countImages}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className='text text_type_main-medium'>
                        {summ}&nbsp;
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        </>
    );
}
