import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner/spinner';
import { TResetRequest } from '@/shared/types/tauth';

import { resetThunk } from '@/services/actions/authSlice';
import { useAppDispatch, useAppSelector } from '@/services/store';

export function ResetPasswordPage() {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.auth);

    const [okMsg, setOkMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
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
        } catch (err: any) {
            setErrMsg(err.message);
            console.error('Ошибка восстановления пароля:', err);
        }
    };

    return (
        <>
            <div className='text text_type_main-medium'>Восстановление пароля</div>

            {okMsg && <div className='pt-6 text text_type_main-small' style={{color:'green'}}>{okMsg}</div>}

            <form onSubmit={handleSubmit}>
                <div className='pt-6'>
                    <PasswordInput
                        onChange={e => onChange(e, 'password')}
                        value={resetData.password}
                        name={'password'}
                        placeholder='Введите новый пароль'
                        extraClass='mb-2'
                        // @ts-ignore
                        error={!!errItemsMsgs.password}
                        errorText={errItemsMsgs.password}
                    />
                </div>

                <div className='pt-6'>
                    {
                        // @ts-ignore - почему-то выдается ошибка на эту строку, требует свойства
                        // добавляю свойста, ошибки в консоли, пришлось придумать такое
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

            {errMsg && <div className='pt-6 text text_type_main-small' style={{color:'red'}}>{errMsg}</div>}


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
