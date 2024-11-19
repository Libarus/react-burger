import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import nhstyle from './nav-header.module.css';

const NavHeader = () => {
    return (
        <nav className={nhstyle.nav}>
            <div>
                <a href='/constructor'>
                    <BurgerIcon type='primary' />
                    <span className='text text_type_main-default'>Конструктор</span>
                </a>
            </div>
            <div>
                <a href='/feed'>
                    <ListIcon type='secondary' />
                    <span className='text text_type_main-default text_color_inactive'>Лента&nbsp;заказов</span>
                </a>
            </div>
        </nav>
    );
};

export default NavHeader;
