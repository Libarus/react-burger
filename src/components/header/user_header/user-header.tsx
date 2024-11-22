import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import uhstyle from './user-header.module.css';

/**
 * Компонент UserHeader - блок навигации для личного кабинета
 * @returns {JSX.Element} - JSX-элемент блока навигации
 */
const UserHeader: React.FC = () => {
    return (
        <div className={uhstyle.user}>
            <div>
                <a href='/profile'>
                    <ProfileIcon type='secondary' />
                    <span className='text text_type_main-default text_color_inactive'>Личный кабинет</span>
                </a>
            </div>
        </div>
    );
};

export default UserHeader;