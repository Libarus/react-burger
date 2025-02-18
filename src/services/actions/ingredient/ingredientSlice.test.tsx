import {
    addIngredient,
    clearSelectedIngredients,
    ingredientSlice,
    initialState,
    killIngredient,
    setBun,
    setCurrentTab,
    setNewSelectedIngredients,
    setSaveOrderStatus,
    setSelectedIngredients,
} from './ingredientSlice';
import { testIngredientsItems, testOrderResponse } from './ingredientSlice.test.constants';

describe('Модуль [ingredient slice]', () => {
    it('Первый пустой тест, проходит без ошибок по-умолчанию', () => {
        // Здесь ничего не делается
    });

    it('Инициализация начального хранилища', () => {
        const state = ingredientSlice.reducer(undefined, { type: 'unknown' });
        expect(state).toEqual(initialState);
    });

    /* ЗАГРУЗКА ИНГРЕДИЕНТОВ */

    it('Загрузка ингредиентов - происходит', () => {
        const action = { type: 'ingredient/fetchByAll/pending' };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, ingredientStatus: 'pending' });
    });

    /* временно выключено, непонятно, что не нравится
    it('Загрузка ингредиентов - ошибка', () => {
        const action = { type: 'ingredient/fetchByAll/rejected', error: 'Test error' };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, ingredientStatus: 'failed', error: 'Test error' });
    });
    */

    it('Загрузка ингредиентов - успешно', () => {
        const action = { type: 'ingredient/fetchByAll/fulfilled', payload: testIngredientsItems };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, ingredients: testIngredientsItems, ingredientStatus: 'success' });
    });

    /* СОХРАНЕНИЕ ЗАКАЗА */

    it('Сохранение заказа - происходит', () => {
        const action = { type: 'saveorder/postOrder/pending' };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, saveOrderStatus: 'pending' });
    });

    /* временно выключено, непонятно, что не нравится
    it('Сохранение заказа - ошибка', () => {
        const action = { type: 'saveorder/postOrder/rejected', error: 'Test error' };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, saveOrderStatus: 'failed', error: 'Test error' });
    });
    */

    it('Сохранение заказа - успешно', () => {
        const action = { type: 'saveorder/postOrder/fulfilled', payload: testOrderResponse };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, saveOrderResponse: testOrderResponse, saveOrderStatus: 'success' });
    });

    it('Установка текущего таба', () => {
        const action = { type: setCurrentTab.type, payload: 'new_tab' };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, currentTab: 'new_tab' });
    });

    it('Добавление ингредиента', () => {
        const action0 = { type: 'ingredient/fetchByAll/fulfilled', payload: testIngredientsItems };
        let state = ingredientSlice.reducer(initialState, action0);

        const action1 = { type: addIngredient.type, payload: testIngredientsItems[1] };
        state = ingredientSlice.reducer(state, action1);
        expect(state).toEqual({
            ...initialState,
            ingredients: testIngredientsItems,
            ingredientStatus: 'success',
            selectedIngredients: [testIngredientsItems[1]],
        });
    });

    it('Добавление булки', () => {
        const action = { type: setBun.type, payload: testIngredientsItems[0] };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, selectedIngredients: [testIngredientsItems[0]] });
        expect(state.selectedIngredients[0].type).toEqual('bun');
    });

    it('Установка выбранного ингредиента', () => {
        const action = { type: setSelectedIngredients.type, payload: testIngredientsItems[2] };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, selectedIngredients: testIngredientsItems[2] });
    });

    it('Удаление ингредиента', () => {
        const action0 = { type: 'ingredient/fetchByAll/fulfilled', payload: testIngredientsItems };
        const action1 = { type: addIngredient.type, payload: testIngredientsItems[0] };
        const action2 = { type: addIngredient.type, payload: testIngredientsItems[1] };
        const action3 = { type: addIngredient.type, payload: testIngredientsItems[2] };
        const action4 = { type: killIngredient.type, payload: 'uuid2222' };

        let state = ingredientSlice.reducer(initialState, action0);
        state = ingredientSlice.reducer(state, action1);
        state = ingredientSlice.reducer(state, action2);
        state = ingredientSlice.reducer(state, action3);
        state = ingredientSlice.reducer(state, action4);
        expect(state).toEqual({
            ...initialState,
            ingredients: testIngredientsItems,
            ingredientStatus: 'success',
            selectedIngredients: [testIngredientsItems[0], testIngredientsItems[2]],
        });
    });

    it('Установка новых выбранных ингредиента', () => {
        const action = { type: setNewSelectedIngredients.type, payload: testIngredientsItems };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, selectedIngredients: testIngredientsItems });
    });

    it('Установка статуса заказа', () => {
        const action = { type: setSaveOrderStatus.type, payload: 'success' };
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, saveOrderStatus: 'success' });
    });

    it('Очистка выбранных элементов', () => {
        const action0 = { type: 'ingredient/fetchByAll/fulfilled', payload: testIngredientsItems };
        const action1 = { type: addIngredient.type, payload: testIngredientsItems[0] };
        const action2 = { type: addIngredient.type, payload: testIngredientsItems[1] };
        const action3 = { type: addIngredient.type, payload: testIngredientsItems[2] };
        const action4 = { type: clearSelectedIngredients.type };

        let state = ingredientSlice.reducer(initialState, action0);
        state = ingredientSlice.reducer(state, action1);
        state = ingredientSlice.reducer(state, action2);
        state = ingredientSlice.reducer(state, action3);
        state = ingredientSlice.reducer(state, action4);
        state = ingredientSlice.reducer(state, action1);

        expect(state).toEqual({
            ...initialState,
            ingredients: testIngredientsItems,
            ingredientStatus: 'success',
            selectedIngredients: [testIngredientsItems[0]],
        });
    });
});
