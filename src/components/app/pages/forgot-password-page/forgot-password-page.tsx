import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';

import { forgotThunk } from '@/services/actions/authSlice';
import { useAppDispatch, useAppSelector } from '@/services/store';

export function ForgotPasswordPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { status } = useAppSelector(state => state.auth);

    const [email, setEmail] = useState('aazab@ya.ru');
    const [errEmailMsg, setErrEmailMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        setErrEmailMsg('');
        e.preventDefault();

        if (!email) {
            setErrEmailMsg('Введите email');
            return;
        }

        try {
            await dispatch(forgotThunk({ email })).unwrap();
            navigate('/reset-password', { replace: true });
        } catch (err) {
            console.error('Ошибка восстановления пароля:', err);
        }
    };

    return (
        <>
            <div className='text text_type_main-medium'>Восстановление пароля</div>
            <form onSubmit={handleSubmit}>
                <div className='pt-6'>
                    <EmailInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        placeholder='E-mail'
                        isIcon={false}
                        // @ts-ignore
                        error={!!errEmailMsg}
                        errorText={errEmailMsg}
                    />
                </div>

                <div className='pt-6'>
                    {status === 'pending' ? (
                        <Spinner />
                    ) : (
                        <Button htmlType='submit' type='primary' size='medium'>
                            Восстановить
                        </Button>
                    )}
                </div>
            </form>

            <div className='pt-20 text text_type_main-small'>
                Вспомнили пароль?
                <Link to='/login' className='pl-2 button_type_secondary'>
                    Войти
                </Link>
            </div>
        </>
    );
}
