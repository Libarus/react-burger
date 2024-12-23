import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MyNavLink } from '@/shared/components/ui/my-nav-link';

import nhstyle from './nav-header.module.css';

/**
 * Компонент NavHeader - навигационная панель.
 */
export function NavHeader() {
    return (
        <nav className={nhstyle.nav}>
            <div>
                <MyNavLink to='/' icon={<BurgerIcon type={'primary'} />} label='Конструктор' />
            </div>
            <div>
                <MyNavLink to='/feed' icon={<ListIcon type={'primary'} />} label='Лента&nbsp;заказов' />
            </div>
        </nav>
    );
}
