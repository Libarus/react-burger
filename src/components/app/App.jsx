import { useEffect, useState } from 'react';

import AppHeader from '../header/app-header/app-header';
import BurgerConstructor from '../constructor/burger-constructor/burger-constructor';
import BurgerIngredients from '../ingredients/burger-ingredients/burger-ingredients';

import './App.css';

import DataAPI from '../../shared/api/data-api';

const dataAPI = new DataAPI();

const App = () => {
    const [ingredients, setIngredients] = useState([]);

    const updateData = async () => {
        let data = null;
        await dataAPI.getData((d) => { data = d; }, errorHandler);

        let updData = [];

        if (data.success) {
            updData = data.data.map((item) => {
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
            });
        }
    
        setIngredients(updData);
    };

    const errorHandler = (error) => {
        console.error(error);
        throw new Error('Ошибка чтения ингредиентов');
    };

    useEffect(() => {
        updateData();

        return () => {}
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
