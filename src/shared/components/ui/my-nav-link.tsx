import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { cloneElement } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    to: string;
    icon: TIconProps;
    label: string;
};

export const MyNavLink = ({ to, icon, label }: Props) => {
    const active = 'text text_type_main-default';
    const inactive = 'text text_type_main-default text_color_inactive';
    return (
        <NavLink end to={to} className={({ isActive }) => (isActive ? active : inactive)}>
            {({ isActive }) => (
                <>
                    {cloneElement(icon as JSX.Element, { type: isActive ? 'primary' : 'secondary' })}
                    {label}
                </>
            )}
        </NavLink>
    );
};
