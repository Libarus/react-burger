import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import tistyle from './tab-ingredients.module.css';

const TabIngredients = ({ current, setCurrent }) => {
    return (
        <div className={`pt-5 pb-2 ${tistyle.flex}`}>
            <Tab value='one' active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value='two' active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value='three' active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
};

export default TabIngredients;
