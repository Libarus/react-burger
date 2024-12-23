import { useAppSelector } from '@/services/store';
import { TRegisterRequest } from '@shared/types/tauth';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export function ProfilePage() {

    const user = useAppSelector(store => store.auth.user);

    const [regData, setRegData] = useState<TRegisterRequest>({
        name: user == null ? 'wrong' : user.name,
        email: user == null ? 'wrong' : user.email,
        password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setRegData(state => {
            return { ...state, [name]: e.target.value };
        });
    };

    return (
        <>
            <form>
                <div>
                    {
                        // добавляю свойста, ошибки в консоли, пришлось придумать такое
                        // @ts-ignore - почему-то выдается ошибка на эту строку, требует свойства
                        <Input
                            onChange={e => onChange(e, 'name')}
                            value={regData.name}
                            name={'name'}
                            placeholder='Имя'
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
                    />
                </div>

                <div className='pt-6'>
                    <PasswordInput
                        onChange={e => onChange(e, 'password')}
                        value={regData.password}
                        name={'password'}
                        extraClass='mb-2'
                        placeholder='Пароль'
                    />
                </div>
            </form>
        </>
    );
}
