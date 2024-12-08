import { TIngredient } from "../types/tingredient";
import { TInternalIngredient } from "../types/tinternal-ingredient";

export function getIngredients(ingredients: TInternalIngredient[]): TIngredient[] {
    return ingredients.map((item: TInternalIngredient) => {
        return {
            id: item._id,
            name: item.name,
            image: item.image,
            type: item.type,
            price: item.price,
            calories: item.calories,
            proteins: item.proteins,
            fat: item.fat,
            carbohydrates: item.carbohydrates,
            badge: 0
        } as TIngredient;
    });
}