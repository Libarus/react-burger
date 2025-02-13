import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { thunk } from 'redux-thunk';

import authReducer from './actions/authSlice';
import ingredientReducer from './actions/ingredientSlice';
import { loggerMiddleware } from './middlewares/loggerMiddleware';

// клмбинируем рудьюсеры
const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    auth: authReducer,
});

export function createStore() {
    const store = configureStore({
        reducer: rootReducer,
        //devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware => getDefaultMiddleware()
            .concat(thunk)
            .concat(loggerMiddleware),
    });

    setupListeners(store.dispatch);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
