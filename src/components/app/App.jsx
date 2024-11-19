import { useEffect, useState } from 'react';

import AppHeader from '../header/app-header/app-header';
import BurgerConstructor from '../constructor/burger-constructor/burger-constructor';
import BurgerIngredients from '../ingredients/burger-ingredients/burger-ingredients';

import './App.css';

import DataAPI from '../../shared/api/data-api';

const dataAPI = new DataAPI();

const App = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        dataAPI.getData(
            (data) => {
                if (data.success) {
                    setIngredients(
                        data.data.map((item) => {
                            return {
                                id: item._id,
                                name: item.name,
                                type: item.type,
                                price: item.price,
                                image: item.image,
                                badge: Math.round(Math.random() * 10),
                                calories: item.calories,
                                proteins: item.proteins,
                                fat: item.fat,
                                carbohydrates: item.carbohydrates,
                            };
                        }),
                    );
                } else {
                    throw new Error('Ошибка чтения ингредиентов');
                }
            },
            (error) => {
                throw new Error('Ошибка чтения ингредиентов');
            },
        );
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
