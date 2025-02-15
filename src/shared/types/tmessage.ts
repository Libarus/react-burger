import { type TFeedOrder } from './tfeed-order';

export type TMessage = {
    success: boolean;
    total: number;
    totalToday: number;
    orders: TFeedOrder[];
    message?: string;
};
