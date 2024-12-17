import alstyle from './auth-layout.module.css';

type Props = {
    element: JSX.Element;
};

export function AuthLayout({ element }: Props) {
    return <div className={`${alstyle.authLayout} asd asdddd`}>{element}</div>;
}
