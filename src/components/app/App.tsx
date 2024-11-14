import AppHeader from '../header/app-header/app-header';
import BurgerConstructor from '../constructor/burger-constructor/burger-constructor';
import BurgerIngredients from '../ingredients/burger-ingredients/burger-ingredients';

import './App.css';

import data from '../../mock-data/data.json';
import { useEffect } from 'react';

const App = () => {
    const ingredients = data.map((item) => {
        return {
            id: item._id,
            name: item.name,
            type: item.type,
            price: item.price,
            image: item.image,
        };
    });

    return (
        <>
            <AppHeader />
            <div className='app'>
                <BurgerIngredients ingredients={ingredients} />
                <BurgerConstructor ingredients={ingredients} />
            </div>
        </>
    );
};

export default App;
