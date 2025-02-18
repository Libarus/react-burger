import { authSlice, initialState, logout } from './authSlice';
import { testUser } from './authSlice.constants';

describe('Модуль [auth slice]', () => {
    const checkPending = (name: string, type: string) => {
        it(`${name} - происходит`, () => {
            const action = { type: `${type}/pending` };
            const state = authSlice.reducer(initialState, action);
            expect(state).toEqual({ ...initialState, status: 'pending' });
        });
    };

    const checkError = (name: string, type: string) => {
        it(`${name} - ошибка`, () => {
            const action = { type: `${type}/rejected`, payload: 'Test error' };
            const state = authSlice.reducer(initialState, action);
            expect(state).toEqual({ ...initialState, status: 'failed', error: 'Test error' });
        });
    };

    it('Первый пустой тест, проходит без ошибок по-умолчанию', () => {
        // Здесь ничего не делается
    });

    it('Инициализация начального хранилища', () => {
        const state = authSlice.reducer(undefined, { type: 'unknown' });
        expect(state).toEqual(initialState);
    });

    /* РЕГИСТРАЦИЯ */

    checkPending('Регистрация', 'auth/register');
    checkError('Регистрация', 'auth/register');

    it('Регистрация - успешно', () => {
        const action = { type: 'auth/register/fulfilled', payload: { user: testUser } };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success', user: testUser });
    });

    /* ОБНОВЛЕНИЕ */

    checkPending('Обновление', 'auth/patch');
    checkError('Обновление', 'auth/patch');

    it('Обновление - успешно', () => {
        const action = { type: 'auth/patch/fulfilled', payload: { user: testUser } };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success', user: testUser });
    });

    /* АУТЕНТИФИКАЦИЯ */

    checkPending('Аутентификация', 'auth/login');
    checkError('Аутентификация', 'auth/login');

    it('Аутентификация - успешно', () => {
        const action = { type: 'auth/login/fulfilled', payload: { user: testUser } };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success', user: testUser });
    });

    /* ВОССТАНОВЛЕНИЕ ПАРОЛЯ */

    checkPending('Восстановление пароля', 'auth/forgot');
    checkError('Восстановление пароля', 'auth/forgot');

    it('Восстановление пароля - успешно', () => {
        const action = { type: 'auth/forgot/fulfilled' };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success' });
    });

    /* СБРОС ПАРОЛЯ */

    checkPending('Сброс пароля', 'auth/reset');
    checkError('Сброс пароля', 'auth/reset');

    it('Сброс пароля - успешно', () => {
        const action = { type: 'auth/reset/fulfilled' };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success' });
    });

    /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ */

    checkPending('Получение пользователя', 'auth/getUser');
    checkError('Получение пользователя', 'auth/getUser');

    it('Получение пользователя - успешно', () => {
        const action = { type: 'auth/getUser/fulfilled', payload: { user: testUser } };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success', user: testUser });
    });

    /* ПРОВЕРКА ТОКЕНА */

    checkPending('Проверка токена', 'auth/validateToken');
    checkError('Проверка токена', 'auth/validateToken');

    it('Проверка токена - успешно', () => {
        const action = { type: 'auth/validateToken/fulfilled' };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success' });
    });

    /* ВЫХОД */

    it('Получение пользователя - успешно', () => {
        const action = { type: 'auth/getUser/fulfilled', payload: { user: testUser } };
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'success', user: testUser });

        const action2 = { type: logout.type };
        const state2 = authSlice.reducer(state, action2);
        expect(state2).toEqual({ ...initialState, status: 'success', user: null });
    });
});

/*
-- logout
*/
