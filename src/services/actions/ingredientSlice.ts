import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { type TInternalData } from '../../shared/types/tinternal-data';

import DataAPI from '../../shared/api/data-api';
import { type TOrderRequest, type TOrderResponse } from '../../shared/types/torder';
import { type TIngredient } from '../../shared/types/tingredient';
import { getIngredients } from '../../shared/utils';

const dataAPI = new DataAPI();

const initialState = {
    ingredients: [] as TIngredient[],
    ingredientStatus: 'idle',

    selectedIngredients: [] as TIngredient[],
    selectedSumm: 0,

    currentTab: 'bun',

    saveOrderResponse: {} as TOrderResponse,
    saveOrderStatus: 'idle',
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

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setBun: (state, action) => {
            state.selectedIngredients[0] = action.payload;
        },
        addIngredient: (state, action) => {
            const newIngredient = state.ingredients.find((item: TIngredient) => item.id === action.payload) as TIngredient;
            if (newIngredient.type === 'bun') {
                state.selectedIngredients[0] = newIngredient;
                return;
            }
            state.selectedIngredients = [...state.selectedIngredients, newIngredient];
        },
        killIngredient: (state, action) => {
            const { id, index } = action.payload;
            const elems = state.selectedIngredients.filter((item: TIngredient, indx: number) => !(item.id === id && indx === index));
            state.selectedIngredients = elems;
        },
        setNewSelectedIngredients: (state, action) => {
            state.selectedIngredients = [...action.payload];
        },
        setSaveOrderStatus: (state, action) => {
            state.saveOrderStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadIngredients.pending, (state) => {
            state.ingredientStatus = 'pending';
        });
        builder.addCase(loadIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
            state.ingredientStatus = 'success';
        });
        builder.addCase(loadIngredients.rejected, (state, action) => {
            // При ошибке информация выводится в консоль
            console.error(action.payload);
            state.ingredientStatus = 'failed';
        });

        builder.addCase(saveOrder.pending, (state) => {
            state.saveOrderStatus = 'pending';
        });
        builder.addCase(saveOrder.fulfilled, (state, action) => {
            state.saveOrderResponse = action.payload;
            state.saveOrderStatus = 'success';
        });
        builder.addCase(saveOrder.rejected, (state, action) => {
            // При ошибке информация выводится в консоль
            console.error(action.payload);
            state.saveOrderStatus = 'failed';
        });
    },
});

export const { setCurrentTab, setBun, addIngredient, killIngredient, setNewSelectedIngredients, setSaveOrderStatus } =
    ingredientSlice.actions;
export default ingredientSlice.reducer;
