import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { type TInternalIngredient } from '../../shared/types/tinternal-ingredient';
import { type TInternalData } from '../../shared/types/tinternal-data';

import DataAPI from '../../shared/api/data-api';
import { TOrderRequest, TOrderResponse } from '../../shared/types/torder';

const dataAPI = new DataAPI();

const initialState = {
    ingredients: [] as TInternalIngredient[],
    ingredientStatus: 'idle',

    selectedIngredients: [] as TInternalIngredient[],
    selectedSumm: 0,

    currentTab: 'bun',

    saveOrderStatus: 'idle',
};

export const loadIngredients = createAsyncThunk<TInternalData, void, { rejectValue: string; fulfillWithValue: any }>(
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
            (e: Error) => (e = error),
        );

        if (isOk) return fulfillWithValue(data);
        return rejectWithValue(error.message);
    },
);

export const saveOrder = createAsyncThunk<TOrderResponse, TOrderRequest, { rejectValue: string; fulfillWithValue: any }>(
    'saveorder/postOrder',
    async (body: TOrderRequest, { rejectWithValue, fulfillWithValue }) => {
        let isOk = false;
        let data: TOrderResponse = {} as TOrderResponse;
        let error: Error = {} as Error;

        await dataAPI.saveOrder(body,
            (d: TOrderResponse) => {
                data = d;
                isOk = true;
            },
            (e: Error) => (e = error),
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
            const newIngredient = state.ingredients.find((item: TInternalIngredient) => item._id === action.payload) as TInternalIngredient;
            if (newIngredient.type === 'bun') {
                state.selectedIngredients[0] = newIngredient;
                return;
            }
            state.selectedIngredients = [...state.selectedIngredients, newIngredient];
        },
        killIngredient: (state, action) => {
            const { id, index } = action.payload;
            console.info(id, index);
            const elems = state.selectedIngredients.filter((item: TInternalIngredient, indx: number) => !(item._id === id && indx === index));
            console.info(elems);
            state.selectedIngredients = elems;
        },
        setNewSelectedIngredients: (state, action) => {
            console.log('action.payload', action.payload);
            state.selectedIngredients = [...action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadIngredients.pending, (state, action) => {
            console.log(action);
            state.ingredientStatus = 'pending';
        });
        builder.addCase(loadIngredients.fulfilled, (state, action) => {
            console.log(action);
            state.ingredients = action.payload.data;
            state.ingredientStatus = 'success';
        });
        builder.addCase(loadIngredients.rejected, (state, action) => {
            console.log(action);
            state.ingredientStatus = 'failed';
        });

        builder.addCase(saveOrder.pending, (state, action) => {
            console.log(action);
            state.saveOrderStatus = 'pending';
        });
        builder.addCase(saveOrder.fulfilled, (state, action) => {
            console.log('success', action);
            state.saveOrderStatus = 'success';
        });
        builder.addCase(saveOrder.rejected, (state, action) => {
            console.log(action);
            state.saveOrderStatus = 'failed';
        });
    },
});

export const { setCurrentTab, setBun, addIngredient, killIngredient, setNewSelectedIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;
