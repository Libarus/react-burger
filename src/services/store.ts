import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { thunk } from 'redux-thunk';

import { TMessage } from '@/shared/types/tmessage';

import authReducer from './actions/authSlice';
import ingredientReducer from './actions/ingredientSlice';
import orderReducer, { connect, disconnect, onConnected, onDisconnected, onError, onMessageReceived, sendMessage } from './actions/orderSlice';
import { createWebSocketMiddleware } from './middlewares/websocketMiddleware';

// клмбинируем рудьюсеры
const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    auth: authReducer,
    orders: orderReducer,
});

export const webSocketMiddleware = createWebSocketMiddleware<TMessage>(
    {
        connect,
        disconnect,
        sendMessage,
        onConnected,
        onDisconnected,
        onMessageReceived,
        onError,
    },
    {
        withTokenRefresh: true,
    },
);

export function createStore() {
    const store = configureStore({
        reducer: rootReducer,
        // devTools: process.env.NODE_ENV !== 'production', // Раскомментируйте, если нужно
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk).concat(webSocketMiddleware),
    });

    setupListeners(store.dispatch);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
