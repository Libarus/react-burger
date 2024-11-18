import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import lhstyle from './logo-header.module.css';

const LogoHeader = () => {
    return (
        <div className={lhstyle.logo}>
            <Logo />
        </div>
    );
};

export default LogoHeader;
