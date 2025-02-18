import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataAPI from '@shared/api/data-api';
import { type TIngredient } from '@shared/types/tingredient';
import { type TInternalData } from '@shared/types/tinternal-data';
import { type TOrderRequest, type TOrderResponse } from '@shared/types/torder';
import { getIngredients } from '@shared/utils';

import { type TIngredientSliceState } from '@/shared/types/tingredient-slice';

const dataAPI = new DataAPI();

export const initialState: TIngredientSliceState = {
    ingredients: [] as TIngredient[],
    ingredientStatus: 'idle',

    selectedIngredients: [] as TIngredient[],
    selectedSumm: 0,

    currentTab: 'bun',

    saveOrderResponse: {} as TOrderResponse,
    saveOrderStatus: 'idle',

    error: '',
};

export const loadIngredients = createAsyncThunk<TIngredient[], void, { rejectValue: string; fulfillWithValue: string }>(
    'ingredient/fetchByAll',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        let isOk = false;
        let data: TInternalData = {} as TInternalData;
        let error: Error = {} as Error;

        await dataAPI.getData(
            (d: TInternalData) => {
                data = d;
                isOk = true;
            },
            (e: Error) => (error = e),
        );

        if (isOk) return fulfillWithValue(getIngredients(data.data));
        return rejectWithValue(error.message);
    },
);

export const saveOrder = createAsyncThunk<TOrderResponse, TOrderRequest, { rejectValue: string; fulfillWithValue: string }>(
    'saveorder/postOrder',
    async (body: TOrderRequest, { rejectWithValue, fulfillWithValue }) => {
        let isOk = false;
        let data: TOrderResponse = {} as TOrderResponse;
        let error: Error = {} as Error;

        await dataAPI.saveOrder(
            body,
            (d: TOrderResponse) => {
                data = d;
                isOk = true;
            },
            (e: Error) => (error = e),
        );

        if (isOk) return fulfillWithValue(data);
        return rejectWithValue(error.message);
    },
);

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setBun: {
            reducer: (state, action) => {
                state.selectedIngredients[0] = action.payload;
            },
            // @ts-expect-error: Отключил точечно данную проверку, так как lint выдает ошибку
            prepare: (payload: TIngredient) => {
                return { payload: { ...payload, uuid: Date.now().toString() } };
            },
        },
        addIngredient: {
            reducer: (state, action) => {
                const newIngredient = state.ingredients.find((item: TIngredient) => item.id === action.payload.id) as TIngredient;
                if (newIngredient.type === 'bun') {
                    state.selectedIngredients[0] = newIngredient;
                } else {
                    newIngredient.uuid = action.payload.uuid;
                    state.selectedIngredients = [...state.selectedIngredients, newIngredient];
                }
            },
            // @ts-expect-error:  Отключил точечно данную проверку, так как lint выдает ошибку
            prepare: (payload: TIngredient) => ({ payload: { id: payload, uuid: Date.now().toString() } }),
        },
        setSelectedIngredients: (state, action) => {
            state.selectedIngredients = action.payload;
        },
        killIngredient: (state, action) => {
            const uuid = action.payload;
            const elems = state.selectedIngredients.filter((item: TIngredient) => !(item.uuid === uuid));
            state.selectedIngredients = elems;
        },
        setNewSelectedIngredients: (state, action) => {
            state.selectedIngredients = [...action.payload];
        },
        setSaveOrderStatus: (state, action) => {
            state.saveOrderStatus = action.payload;
        },
        clearSelectedIngredients: state => {
            state.selectedIngredients = [state.selectedIngredients[0]];
        },
    },
    extraReducers: builder => {
        // Загрузка ингредиентов
        builder
            .addCase(loadIngredients.pending, state => {
                state.ingredientStatus = 'pending';
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.ingredientStatus = 'success';
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                // При ошибке информация выводится в консоль
                state.error = action.payload as string;
                state.ingredientStatus = 'failed';
            });

        // Сохранение заказа
        builder
            .addCase(saveOrder.pending, state => {
                state.saveOrderStatus = 'pending';
            })
            .addCase(saveOrder.fulfilled, (state, action) => {
                state.saveOrderResponse = action.payload;
                state.saveOrderStatus = 'success';
            })
            .addCase(saveOrder.rejected, (state, action) => {
                // При ошибке информация выводится в консоль
                state.error = action.payload as string;
                state.saveOrderStatus = 'failed';
            });
    },
});

export const {
    setCurrentTab,
    setBun,
    addIngredient,
    setSelectedIngredients,
    killIngredient,
    setNewSelectedIngredients,
    setSaveOrderStatus,
    clearSelectedIngredients,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
