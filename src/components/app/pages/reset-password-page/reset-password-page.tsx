import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';
import { TResetRequest } from '@/shared/types/tauth';
import { TError } from '@/shared/types/terror';

import { resetThunk } from '@/services/actions/auth/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/services/store';

export function ResetPasswordPage() {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state: RootState) => state.auth);

    const [okMsg, setOkMsg] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [resetData, setResetData] = useState<TResetRequest>({ password: '', token: '' });
    const [errItemsMsgs, setErrItemsMsgs] = useState<TResetRequest>({ password: '', token: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setResetData(state => {
            return { ...state, [name]: e.target.value };
        });

        setErrItemsMsgs(state => {
            return { ...state, [name]: '' };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setErrItemsMsgs({ password: '', token: '' });
        setOkMsg('');
        setErrMsg('');
        e.preventDefault();

        if (!resetData.password) {
            setErrItemsMsgs(state => {
                return { ...state, password: 'Введите пароль' };
            });
            return;
        }

        if (!resetData.token) {
            setErrItemsMsgs(state => {
                return { ...state, token: 'Введите код из письма' };
            });
            return;
        }

        try {
            await dispatch(resetThunk(resetData)).unwrap();
            setErrItemsMsgs({ password: '', token: '' });
            setResetData({ password: '', token: '' });
            setOkMsg('Пароль успешно изменен, можете войти в свою учётную запись используя новый пароль.');
        } catch (e: unknown) {
            const err = e as TError;
            setErrMsg(err.message);
            console.error('Ошибка восстановления пароля:', err);
        }
    };

    return (
        <>
            <div className='text text_type_main-medium'>Восстановление пароля</div>

            {okMsg && (
                <div className='pt-6 text text_type_main-small' style={{ color: 'green' }}>
                    {okMsg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='pt-6'>
                    <PasswordInput
                        onChange={e => onChange(e, 'password')}
                        value={resetData.password}
                        name={'password'}
                        placeholder='Введите новый пароль'
                        extraClass='mb-2'
                        // @ts-expect-error: скрыл от компиляции "error", показывает ошибку, но её нет
                        error={!!errItemsMsgs.password}
                        errorText={errItemsMsgs.password}
                    />
                </div>

                <div className='pt-6'>
                    {
                        // @ts-expect-error: - почему-то выдается ошибка
                        <Input
                            onChange={e => onChange(e, 'token')}
                            value={resetData.token}
                            name={'token'}
                            placeholder='Введите код из письма'
                            extraClass='mb-2'
                            error={!!errItemsMsgs.token}
                            errorText={errItemsMsgs.token}
                        />
                    }
                </div>

                {errMsg && (
                    <div className='pt-6 text text_type_main-small' style={{ color: 'red' }}>
                        {errMsg}
                    </div>
                )}

                <div className='pt-6'>
                    {status === 'pending' ? (
                        <Spinner />
                    ) : (
                        <Button htmlType='submit' type='primary' size='medium'>
                            Сохранить
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
