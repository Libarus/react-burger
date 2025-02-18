import { connect, disconnect, initialState, onConnected, onDisconnected, onError, onMessageReceived, orderSlice } from './orderSlice';

describe('Модуль [order slice]', () => {
    it('Первый пустой тест, проходит без ошибок по-умолчанию', () => {
        // Здесь ничего не делается
    });

    it('Инициализация начального хранилища', () => {
        const state = orderSlice.reducer(undefined, { type: 'unknown' });
        expect(state).toEqual(initialState);
    });

    it('Подключение (connecting)', () => {
        const action = { type: connect.type, payload: 'link_to_wss' };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'connecting', url: 'link_to_wss' });
    });

    it('Отключение (disconnect)', () => {
        const action = { type: disconnect.type };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'disconnecting' });
    });

    it('Подключено (onConnected)', () => {
        const action = { type: onConnected.type };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'connected' });
    });

    it('Отключено (onDisconnected)', () => {
        const action = { type: onDisconnected.type, payload: { code: 999, reason: 'test disconnect' } };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, status: 'disconnected', code: 999, reason: 'test disconnect' });
    });

    it('Получение сообщения (onMessageReceived)', () => {
        const action = { type: onMessageReceived.type, payload: 'message received' };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, message: 'message received' });
    });

    it('Ошибка (onError)', () => {
        const action = { type: onError.type, payload: 'onError - test error' };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'onError - test error' });
    });
});
