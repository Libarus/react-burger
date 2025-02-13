import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    status: 'disconnected',
    error: null,
};

const messageSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        connect: (state, _action: PayloadAction<string>) => {
            state.status = 'connecting';
        },

        disconnect: state => {
            state.status = 'disconnecting';
        },

        sendMessage: (_state, _action: PayloadAction<Message>) => {},

        onConnected: (state, _action: PayloadAction<Event>) => {
            state.status = 'connected';
        },

        onDisconnected: (state, _action: PayloadAction<CloseEvent>) => {
            state.status = 'disconnected';
        },

        onMessageReceived: (state, action: PayloadAction<Message>) => {
            // ...
        },
        onError: (state, action: PayloadAction<Event>) => {
            state.error = action.payload;
        },
    },
});

export const {
    connect,
    disconnect,
    sendMessage,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError,
} = messageSlice.actions;
export default messageSlice.reducer;
