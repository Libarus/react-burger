import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { setCurrentTab } from '../../../services/actions/ingredientSlice';
import { useAppDispatch } from '../../../services/store';

import tistyle from './tab-ingredients.module.css';

interface Props {
    current: string;
}

/**
 * Компонент TabIngredients - отображает вкладки для выбора типа ингредиентов.
 */
export function TabIngredients({ current }: Props) {
    const dispatch = useAppDispatch();

    const setCurrent = (value: string) => {
        dispatch(setCurrentTab(value));
        document.getElementById(`ingredients_${value}`)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`pt-5 pb-2 ${tistyle.flex}`}>
            <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value='main' active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
}
