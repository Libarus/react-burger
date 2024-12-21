import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import nhstyle from './nav-header.module.css';

/**
 * Компонент NavHeader - навигационная панель.
 */
export function NavHeader() {
    return (
        <nav className={nhstyle.nav}>
            <div>
                <NavLink
                    end
                    to='/'
                    className={({ isActive }) => (isActive ? 'text text_type_main-default' : 'text text_type_main-default text_color_inactive')}>
                    <BurgerIcon type='primary' />
                    Конструктор
                </NavLink>
            </div>
            <div>
                <NavLink
                    end
                    to='/feed'
                    className={({ isActive }) => (isActive ? 'text text_type_main-default' : 'text text_type_main-default text_color_inactive')}>
                    <ListIcon type='secondary' />
                    Лента&nbsp;заказов
                </NavLink>
            </div>
        </nav>
    );
}
