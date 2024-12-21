import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '@services/store';

import uhstyle from './user-header.module.css';

/**
 * Компонент UserHeader - блок навигации для личного кабинета
 */
export function UserHeader() {
    const { accessToken } = useAppSelector(state => state.auth);

    return (
        <div className={uhstyle.user}>
            <div>
                <NavLink
                    to='/profile'
                    className={accessToken != null ? 'text text_type_main-default' : 'text text_type_main-default text_color_inactive'}>
                    <ProfileIcon type='secondary' />
                    Личный кабинет
                </NavLink>
            </div>
        </div>
    );
}
