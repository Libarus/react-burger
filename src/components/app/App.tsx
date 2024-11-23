import { useEffect, useState } from 'react';

import AppHeader from '../header/app-header/app-header';
import BurgerConstructor from '../constructor/burger-constructor/burger-constructor';
import BurgerIngredients from '../ingredients/burger-ingredients/burger-ingredients';

import './App.css';

import DataAPI from '../../shared/api/data-api';

import type TIngredient from '../../shared/types/tingredient';
import TInternalData from '../../shared/types/tinternal-data';
import TInternalIngredient from '../../shared/types/tinternal-ingredient';

const dataAPI = new DataAPI();

/**
 * Компонент App - корневой компонент приложения.
 */
function App () {
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);

    useEffect(() => {
        // updateData - функция, которая обновляет список ингредиентов.
        // Она вызывает DataAPI.getData(), который возвращает Promise,
        // который мы используем, чтобы изменить состояние ingredients.
        // В случае ошибки, она вызывает errorHandler.
        const updateData = async () => {
            let data: TInternalData = {} as TInternalData;

            await dataAPI.getData((d: TInternalData) => {
                data = d;
            }, errorHandler);

            let updData: TIngredient[] = [];

            if (data.success) {
                // преобразуем приходящие данные из TInternalData в TIngredient
                updData = data.data.map((item: TInternalIngredient): TIngredient => {
                    return {
                        id: item._id,
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        image: item.image,
                        badge: 0,
                        calories: item.calories,
                        proteins: item.proteins,
                        fat: item.fat,
                        carbohydrates: item.carbohydrates,
                    };
                });
            }

            setIngredients(updData);
        };

        const errorHandler = (error: Error) => {
            console.error(error);
            throw new Error('Ошибка чтения ингредиентов');
        };

        updateData();
    }, []);

    return (
        <main>
            <AppHeader />
            <div className='app'>
                {ingredients.length > 0 && <BurgerIngredients ingredients={ingredients} />}
                {ingredients.length > 0 && <BurgerConstructor ingredients={ingredients} />}
            </div>
        </main>
    );
};

export default App;
