import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ingredientReducer from './actions/ingredientSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { thunk } from 'redux-thunk';

import { setupListeners } from '@reduxjs/toolkit/query';

// клмбинируем рудьюсеры
const rootReducer = combineReducers({
    ingredient: ingredientReducer,
});

// Наш усилитель
const loggerMiddleware = () => (next: any) => (action: any) => {
    // Выводим в консоль время события и его содержание
    console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}`);
    // Передаём событие «по конвейеру» дальше
    return next(action);
};

export function createStore() {
    const store = configureStore({
        reducer: rootReducer,
        //devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
    });

    setupListeners(store.dispatch);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
