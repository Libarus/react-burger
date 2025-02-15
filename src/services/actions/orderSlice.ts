import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TMessage } from '@/shared/types/tmessage';

const initialState: {
    message: TMessage;
    status: 'idle' | 'connecting' | 'connected' | 'disconnecting' | 'disconnected';
    error: string | null;
    url: string;
    code?: number;
    reason?: string;
} = {
    message: {} as TMessage,
    status: 'disconnected',
    error: null,
    url: '',
    code: -1,
    reason: ''
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<string>) => {
            state.status = 'connecting';
            state.url = action.payload;
        },

        disconnect: state => {
            state.status = 'disconnecting';
        },

        sendMessage: () => {},

        onConnected: state => {
            state.status = 'connected';
        },

        onDisconnected: (state, action: PayloadAction<{ code?: number; reason?: string }>) => {
            state.status = 'disconnected';
            state.code = action.payload.code;
            state.reason = action.payload.reason;
        },

        onMessageReceived: (state, action: PayloadAction<TMessage>) => {
            state.message = action.payload;
        },

        onError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { connect, disconnect, sendMessage, onConnected, onDisconnected, onMessageReceived, onError } = orderSlice.actions;
export default orderSlice.reducer;
