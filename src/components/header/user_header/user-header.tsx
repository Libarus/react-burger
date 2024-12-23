import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MyNavLink } from '@/shared/components/ui/my-nav-link';

import uhstyle from './user-header.module.css';

/**
 * Компонент UserHeader - блок навигации для личного кабинета
 */
export function UserHeader() {
    return (
        <div className={uhstyle.user}>
            <div>
                <MyNavLink to='/profile' icon={<ProfileIcon type={'primary'} />} label='Личный кабинет' />
            </div>
        </div>
    );
}
