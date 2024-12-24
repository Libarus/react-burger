import { loginThunk } from '@services/actions/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '@services/store';
import { TLoginRequest } from '@shared/types/tauth';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';
import { TError } from '@/shared/types/terror';

import { TokenService } from '@/services/token.service';

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { status } = useAppSelector((state: RootState) => state.auth);

    const [errEmailMsg, setErrEmailMsg] = useState('');
    const [errPasswordMsg, setErrPasswordMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loginData, setLoginData] = useState<TLoginRequest>({ email: 'aazab@ya.ru', password: '1234321' }); //({ email: 'u963@exmlp.com', password: 'u963u963' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setLoginData(state => {
            return { ...state, [name]: e.target.value };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setErrMsg('');
        setErrEmailMsg('');
        setErrPasswordMsg('');
        e.preventDefault();

        if (!loginData.email) {
            setErrEmailMsg('Введите e-mail');
            return;
        }

        if (!loginData.password) {
            setErrPasswordMsg('Введите пароль');
            return;
        }

        try {
            const resp = await dispatch(loginThunk(loginData)).unwrap();
            TokenService.SetAccessToken(resp.accessToken);
            TokenService.SetRefreshToken(resp.refreshToken);
            navigate('/profile', { replace: true });
        } catch (e: unknown) {
            const err = e as TError;
            setErrMsg(err.message);
            console.error('Ошибка входа:', err);
        }
    };
    return (
        <>
            {TokenService.GetAccessToken() != null && <Navigate to='/' replace={true} />}
            <div className='text text_type_main-medium'>Вход</div>
            <form onSubmit={handleSubmit}>
                <div className='pt-6'>
                    <EmailInput
                        onChange={e => onChange(e, 'email')}
                        value={loginData.email}
                        name={'email'}
                        isIcon={false}
                        // @ts-expect-error: скрыл от компиляции "error", показывает ошибку, но её нет
                        error={!!errEmailMsg}
                        errorText={errEmailMsg}
                    />
                </div>

                <div className='pt-6'>
                    <PasswordInput
                        onChange={e => onChange(e, 'password')}
                        value={loginData.password}
                        name={'password'}
                        extraClass='mb-2'
                        // @ts-expect-error: скрыл от компиляции "error", показывает ошибку, но её нет
                        error={!!errPasswordMsg}
                        errorText={errPasswordMsg}
                    />
                </div>

                {errMsg && <div className='pt-4 text text_type_main-default text_color_error'>{errMsg}</div>}

                <div className='pt-6'>
                    {status === 'pending' ? (
                        <Spinner />
                    ) : (
                        <Button htmlType='submit' type='primary' size='medium'>
                            Войти
                        </Button>
                    )}
                </div>

                <div className='pt-20 text text_type_main-small'>
                    Вы — новый пользователь?
                    <Link to='/register' className='pl-2 button_type_secondary'>
                        Зарегистрироваться
                    </Link>
                </div>
            </form>

            <div className='pt-4 text text_type_main-small'>
                Забыли пароль?
                <Link to='/forgot-password' className='pl-2 button_type_secondary'>
                    Восстановить пароль
                </Link>
            </div>
        </>
    );
}
