export type TOrderStatus = 'pending' | 'done' | 'created';

export const statusText: Record<TOrderStatus, string> = {
    pending: 'Готовится',
    done: 'Выполнен',
    created: 'Создан',
};

export type TFeedOrder = {
    _id: string;
    name: string;
    number: number;
    ingredients: Array<string>;
    createdAt: string;
    updatedAt: string;
    status: TOrderStatus;
    message?: string;
};
