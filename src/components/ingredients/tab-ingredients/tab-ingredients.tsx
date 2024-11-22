import { FC } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import tistyle from './tab-ingredients.module.css';

interface Props {
    current: string;
    setCurrent: (value: string) => void;
}

/**
 * Компонент TabIngredients - отображает вкладки для выбора типа ингредиентов.
 * @param {string} current - текущая активная вкладка.
 * @param {(value: string) => void} setCurrent - функция для установки активной вкладки.
 * @returns {JSX.Element} - возвращает JSX-элемент с вкладками.
 */
const TabIngredients: FC<Props> = ({ current, setCurrent }) => {
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
