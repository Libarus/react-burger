import { TIngredient } from '../types/tingredient';
import { TInternalIngredient } from '../types/tinternal-ingredient';

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
            badge: 0,
        } as TIngredient;
    });
}

export function formatDate(sDate: string): string {
    const date = new Date(sDate);

    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date > now) {
        throw new Error('Дата не может быть в будущем.');
    }

    if (date.getDate() === today.getDate()) {
        return 'Сегодня, ' + date.getHours() + ':' + date.getMinutes();
    }

    if (date.getDate() === yesterday.getDate()) {
        return 'Вчера, ' + date.getHours() + ':' + date.getMinutes();
    }

    const day = String(date.getDate()).padStart(2, '0'); // День с ведущим нулём
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц с ведущим нулём (+1, потому что месяцы начинаются с 0)
    const year = date.getFullYear(); // Год
    const hours = String(date.getHours()).padStart(2, '0'); // Часы с ведущим нулём
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты с ведущим нулём

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}
