import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import lhstyle from './logo-header.module.css';

/**
 * Компонент LogoHeader - лого в шапке приложения.
 * @returns {JSX.Element} - возвращает JSX элемент лого.
 */
const LogoHeader: React.FC = () => {
    return (
        <div className={lhstyle.logo}>
            <Logo />
        </div>
    );
};

export default LogoHeader;
