import { NavLink, Outlet } from 'react-router-dom';

import plstyle from './profile-layout.module.css';

export function ProfileLayout() {
    return (
        <div className={plstyle.container}>
            <div className={`${plstyle.item} ${plstyle.itemLeft}`}>
                <nav className={plstyle.nav}>
                    <ul>
                        <li>
                            <NavLink
                                end
                                to='/profile'
                                className={({ isActive }) =>
                                    isActive ? 'text text_type_main-small' : 'text text_type_main-small text_color_inactive'
                                }>
                                Персональные данные
                            </NavLink>
                        </li>
                        <li className='pt-8 pb-8'>
                            <NavLink
                                end
                                to='/profile/orders'
                                className={({ isActive }) =>
                                    isActive ? 'text text_type_main-small' : 'text text_type_main-small text_color_inactive'
                                }>
                                История заказов
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/logout'
                                className={({ isActive }) =>
                                    isActive ? 'text text_type_main-small' : 'text text_type_main-small text_color_inactive'
                                }>
                                Выход
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className={`text text_type_main-small text_color_inactive ${plstyle.gray} pt-20`}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            <div className={`${plstyle.item} ${plstyle.itemCenter} pl-15`}>
                <Outlet />
            </div>
            <div className={`${plstyle.item} ${plstyle.itemRight}`}>&nbsp;</div>
        </div>
    );
}
