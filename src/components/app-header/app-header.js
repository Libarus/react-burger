import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ahs from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`p-4 ${ahs.header}`}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button htmlType='button' type='secondary' size='medium' style={{display: 'flex'}}>
                    <BurgerIcon type='primary' className='pl-2 pr-2' />
                    <span className="text text_type_main-default">Конструктор</span>
                </Button>
                <Button htmlType='button' type='secondary' size='medium' style={{display: 'flex'}}>
                    <ListIcon type='secondary' className='pl-2 pr-2' />
                    <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
                </Button>
            </div>
            <div style={{textAlign: 'center'}}>
                <Logo />
            </div>
            <div>
                <Button htmlType='button' type='secondary' size='medium' style={{display: 'flex', float: 'right'}}>
                    <ProfileIcon type='secondary' className='pl-2 pr-2' />
                    <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
                </Button>
            </div>
        </header>
    );
};

export default AppHeader;
