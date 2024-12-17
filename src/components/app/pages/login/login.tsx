import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type LoginData = {
    email: string;
    password: string;
};

export function Login() {
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setLoginData(state => {
            return { ...state, [name]: e.target.value };
        });
    };

    return (
        <>
            <div className='text text_type_main-medium'>Вход</div>

            <div className='pt-6'>
                <EmailInput
                    onChange={e => onChange(e, 'email')}
                    value={loginData.email}
                    name={'email'}
                    placeholder='Логин'
                    isIcon={true}
                    extraClass='mb-2'
                />
            </div>

            <div className='pt-6'>
                <PasswordInput onChange={e => onChange(e, 'password')} value={loginData.password} name={'password'} extraClass='mb-2' />
            </div>

            <div className='pt-6'>
                <Button htmlType='button' type='primary' size='medium'>
                    Войти
                </Button>
            </div>

            <div className='pt-20 text text_type_main-small'>
                Вы — новый пользователь?
                <Link to='/register' className='pl-2 button_type_secondary'>
                    Зарегистрироваться
                </Link>
            </div>

            <div className='pt-4 text text_type_main-small'>
                Забыли пароль?
                <Link to='/forgot-password' className='pl-2 button_type_secondary'>
                    Восстановить пароль
                </Link>
            </div>
        </>
    );
}
