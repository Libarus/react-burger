import { LogoHeader } from '../logo_header/logo-header';
import { NavHeader } from '../nav_header/nav-header';
import { UserHeader } from '../user_header/user-header';

import ahstyle from './app-header.module.css';

/**
 * Компонент AppHeader - верхний колонтитул приложения.
 * Содержит навигацию, логотип и пользовательский профиль.
 */
export function AppHeader() {
    return (
        <header className={`p-4 ${ahstyle.header}`}>
            <div className={ahstyle.wrapper}>
                <NavHeader />
                <LogoHeader />
                <UserHeader />
            </div>
        </header>
    );
}
