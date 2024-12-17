import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type RegData = {
    name: string;
    email: string;
    password: string;
};

export function Register() {
    const [regData, setRegData] = useState<RegData>({ name: '', email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setRegData(state => {
            return { ...state, [name]: e.target.value };
        });
    };

    return (
        <>
            <div className='text text_type_main-medium'>Регистрация</div>

            <div className='pt-6'>
                <Input
                    onChange={e => onChange(e, 'name')}
                    value={regData.name}
                    name={'name'}
                    placeholder='Имя'
                    extraClass='mb-2'
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
            </div>

            <div className='pt-6'>
                <EmailInput
                    onChange={e => onChange(e, 'email')}
                    value={regData.email}
                    name={'email'}
                    placeholder='E-mail'
                    isIcon={true}
                    extraClass='mb-2'
                />
            </div>

            <div className='pt-6'>
                <PasswordInput onChange={e => onChange(e, 'password')} value={regData.password} name={'password'} extraClass='mb-2' />
            </div>

            <div className='pt-6'>
                <Button htmlType='button' type='primary' size='medium'>
                    Зарегистрироваться
                </Button>
            </div>

            <div className='pt-20 text text_type_main-small'>
                Уже зарегистрированы?
                <Link to='/login' className='pl-2 button_type_secondary'>
                    Войти
                </Link>
            </div>
        </>
    );
}
