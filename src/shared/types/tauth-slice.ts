import { TUser } from './tauth';

export type TAuthSliceState = {
    user: TUser | null;
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string;
};
