import { registerThunk } from '@services/actions/authSlice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { Spinner } from '@shared/components/spinner/spinner';
import { TRegisterRequest } from '@shared/types/tauth';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { TokenService } from '@/services/token.service';

export function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [errItemsMsgs, setErrItemsMsg] = useState<TRegisterRequest>({ name: '', email: '', password: '' });

    const [regData, setRegData] = useState<TRegisterRequest>({ name: '', email: '', password: '' });

    const { status } = useAppSelector(store => store.auth);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setRegData(state => {
            return { ...state, [name]: e.target.value };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setErrItemsMsg({ name: '', email: '', password: '' });
        e.preventDefault();

        if (!regData.name) {
            setErrItemsMsg(state => {
                return { ...state, name: 'Введите имя' };
            });
            return;
        }

        if (!regData.email) {
            setErrItemsMsg(state => {
                return { ...state, email: 'Введите email' };
            });
            return;
        }

        if (!regData.password) {
            setErrItemsMsg(state => {
                return { ...state, password: 'Введите пароль' };
            });
            return;
        }

        try {
            const resp = await dispatch(registerThunk(regData)).unwrap();
            TokenService.SetAccessToken(resp.accessToken);
            TokenService.SetRefreshToken(resp.refreshToken);
            navigate('/');
        } catch (err) {
            console.error('Ошибка регистрации:', err);
        }
    };

    return (
        <>
            {TokenService.GetAccessToken() != null && <Navigate to='/' replace={true} />}
            <div className='text text_type_main-medium'>Регистрация</div>
            <form onSubmit={handleSubmit}>
                <div className='pt-6'>
                    {
                        // @ts-expect-error: - почему-то выдается ошибка на эту строку, требует свойства
                        // добавляю свойста, ошибки в консоли, пришлось придумать такое
                        <Input
                            onChange={e => onChange(e, 'name')}
                            value={regData.name}
                            name={'name'}
                            placeholder='Имя'
                            error={errItemsMsgs.name !== ''}
                            errorText={errItemsMsgs.name}
                        />
                    }
                </div>

                <div className='pt-6'>
                    <EmailInput
                        onChange={e => onChange(e, 'email')}
                        value={regData.email}
                        name={'email'}
                        placeholder='E-mail'
                        isIcon={false}
                        // @ts-expect-error: скрыл от компиляции "error", показывает ошибку, но её нет
                        error={!!errItemsMsgs.email}
                        errorText={errItemsMsgs.email}
                    />
                </div>

                <div className='pt-6'>
                    <PasswordInput
                        onChange={e => onChange(e, 'password')}
                        value={regData.password}
                        name={'password'}
                        extraClass='mb-2'
                        // @ts-expect-error: скрыл от компиляции "error", показывает ошибку, но её нет
                        error={!!errItemsMsgs.password}
                        errorText={errItemsMsgs.password}
                        placeholder='Пароль'
                    />
                </div>

                <div className='pt-6'>
                    {status === 'pending' ? (
                        <Spinner />
                    ) : (
                        <Button htmlType='submit' type='primary' size='medium'>
                            Зарегистрироваться
                        </Button>
                    )}
                </div>
            </form>

            <div className='pt-20 text text_type_main-small'>
                Уже зарегистрированы?
                <Link to='/login' className='pl-2 button_type_secondary'>
                    Войти
                </Link>
            </div>
        </>
    );
}
