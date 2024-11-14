
import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import nhstyle from './nav-header.module.css';

const NavHeader = () => {
    return (
        <nav className={nhstyle.nav}>
            <div>
                <BurgerIcon type='primary' />
                <span className="text text_type_main-default">Конструктор</span>
            </div>
            <div>
                <ListIcon type='secondary' />
                <span className="text text_type_main-default text_color_inactive">Лента&nbsp;заказов</span>
            </div>
        </nav>
    );
};

export default NavHeader;
