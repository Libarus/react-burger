import { TIngredient } from './tingredient';
import { TOrderResponse } from './torder';

export type TIngredientSliceState = {
    ingredients: TIngredient[];
    ingredientStatus: 'idle' | 'pending' | 'success' | 'failed';

    selectedIngredients: TIngredient[];
    selectedSumm: number;

    currentTab: 'bun' | 'sauce' | 'main';

    saveOrderResponse: TOrderResponse;
    saveOrderStatus: 'idle' | 'pending' | 'success' | 'failed';

    error: string;
};
