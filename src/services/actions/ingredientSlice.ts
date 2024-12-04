import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { type TInternalIngredient } from '../../shared/types/tinternal-ingredient';
import { type TInternalData } from '../../shared/types/tinternal-data';

import DataAPI from '../../shared/api/data-api';

const dataAPI = new DataAPI();

const initialState = {
    ingredients: [] as TInternalIngredient[],
    ingredientStatus: 'idle',

    selectedIngredients: [] as TInternalIngredient[],

    currentTab: 'bun',
};

// 'pokemon/fetchByName' - префик типа
export const loadIngredients = createAsyncThunk<TInternalData, void, { rejectValue: string, fulfillWithValue: any }>(
    'ingredient/fetchByAll',
    async (_, { rejectWithValue, fulfillWithValue }) => {

        let isOk = false;
        let data: TInternalData = {} as TInternalData;
        let error: Error = {} as Error;

        await dataAPI.getData(
            (d: TInternalData) => { data = d; isOk = true },
            (e: Error) => e = error,
        );

        if (isOk) return fulfillWithValue(data);
        return rejectWithValue(error.message);
    },
);

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => { state.currentTab = action.payload; },
        setBun: (state, action) => { 
            state.selectedIngredients = [ ...state.selectedIngredients.filter((item: TInternalIngredient) => item.type !== 'bun'), action.payload ];
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
    },
});

export const { setCurrentTab, setBun } = ingredientSlice.actions;
export default ingredientSlice.reducer;
