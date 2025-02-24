import { TIngredient } from '@/shared/types/tingredient';
import { TOrderResponse } from '@/shared/types/torder';

export const testIngredientsItems: TIngredient[] = [
    {
        id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        badge: 0,
        uuid: 'uuid1111',
    },
    {
        id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        badge: 0,
        uuid: 'uuid2222',
    },
    {
        id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        badge: 0,
        uuid: 'uuid3333',
    },
];

export const testOrderResponse: TOrderResponse = {
    name: 'Test name string',
    order: {
        number: 999,
    },
    success: true,
};
