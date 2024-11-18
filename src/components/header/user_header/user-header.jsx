import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import uhstyle from './user-header.module.css';

const UserHeader = () => {
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
