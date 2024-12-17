import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { ForgotData } from './fp-type';

type Props = {
    forgotData: ForgotData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};

export function FpCodeForm({ onChange, forgotData }: Props) {
    return (
        <>
            <div className='pt-6'>
                <PasswordInput
                    onChange={e => onChange(e, 'password')}
                    value={forgotData.password}
                    name={'password'}
                    placeholder='Введите новый пароль'
                    extraClass='mb-2'
                />
            </div>

            <div className='pt-6'>
                <Input
                    onChange={e => onChange(e, 'code')}
                    value={forgotData.code}
                    name={'code'}
                    placeholder='Введите код из письма'
                    extraClass='mb-2'
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
            </div>

            <div className='pt-6'>
                <Button htmlType='button' type='primary' size='medium'>
                    Сохранить
                </Button>
            </div>
        </>
    );
}
