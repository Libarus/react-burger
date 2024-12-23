import { TRegisterRequest } from '@shared/types/tauth';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

import { Spinner } from '@/shared/components/spinner/spinner';

import { patchThunk } from '@/services/actions/authSlice';
import { useAppDispatch, useAppSelector } from '@/services/store';

export function ProfilePage() {
    const dispatch = useAppDispatch();
    const { status, user } = useAppSelector(store => store.auth);

    const [okMsg, setOkMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isModify, setIsModify] = useState(false);
    const [errItemsMsg, setErrItemsMsg] = useState<TRegisterRequest>({ name: '', email: '', password: '' });

    const [patchData, setPatchData] = useState<TRegisterRequest>({
        name: user == null ? 'wrong' : user.name,
        email: user == null ? 'wrong' : user.email,
        password: '',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setOkMsg('');
        setPatchData(state => {
            return { ...state, [name]: e.target.value };
        });

        setIsModify(user?.email !== patchData.email || user?.name !== patchData.name || patchData.password != '');
    };

    const cancel = () => {
        setOkMsg('');
        setPatchData(state => {
            return { ...state, name: user == null ? 'wrong' : user.name, email: user == null ? 'wrong' : user.email, password: '' };
        });
        setErrItemsMsg({ name: '', email: '', password: '' });
        setIsModify(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setOkMsg('');
        setErrItemsMsg({ name: '', email: '', password: '' });
        e.preventDefault();

        if (!patchData.name) {
            setErrItemsMsg(state => {
                return { ...state, name: 'Введите имя' };
            });
            return;
        }

        if (!patchData.email) {
            setErrItemsMsg(state => {
                return { ...state, email: 'Введите email' };
            });
            return;
        }

        if (!patchData.password) {
            setErrItemsMsg(state => {
                return { ...state, password: 'Введите пароль' };
            });
            return;
        }

        try {
            await dispatch(patchThunk(patchData)).unwrap();
            cancel();
            setOkMsg('Данные сохранены');
        } catch (err: any) {
            setErrMsg(err.message);
            console.error('Ошибка обновления профиля:', err);
        }
    };

    return (
        <>
            {okMsg && (
                <div className='pb-6 text text_type_main-small' style={{ color: 'green' }}>
                    {okMsg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    {
                        // добавляю свойста, ошибки в консоли, пришлось придумать такое
                        // @ts-ignore - почему-то выдается ошибка на эту строку, требует свойства
                        <Input
                            onChange={e => onChange(e, 'name')}
                            value={patchData.name}
                            name={'name'}
                            placeholder='Имя'
                            // @ts-ignore
                            error={!!errItemsMsg.name}
                            errorText={errItemsMsg.name}
                        />
                    }
                </div>

                <div className='pt-6'>
                    <EmailInput
                        onChange={e => onChange(e, 'email')}
                        value={patchData.email}
                        name={'email'}
                        placeholder='E-mail'
                        isIcon={false}
                        // @ts-ignore
                        error={!!errItemsMsg.email}
                        errorText={errItemsMsg.email}
                    />
                </div>

                <div className='pt-6'>
                    <PasswordInput
                        onChange={e => onChange(e, 'password')}
                        value={patchData.password}
                        name={'password'}
                        extraClass='mb-2'
                        placeholder='Пароль'
                        // @ts-ignore
                        error={!!errItemsMsg.password}
                        errorText={errItemsMsg.password}
                    />
                </div>

                {errMsg && <div className='pt-4 text text_type_main-default text_color_error'>{errMsg}</div>}

                {isModify && (
                <div className='pt-6'>
                    {status === 'pending' ? (
                        <Spinner />
                    ) : (
                        <>
                            <Button htmlType='submit' type='primary' size='medium'>
                                Сохранить
                            </Button>

                            <Button htmlType='button' type='secondary' size='medium' onClick={cancel}>
                                Отменить
                            </Button>
                        </>
                    )}
                </div>
                )}
            </form>
        </>
    );
}
