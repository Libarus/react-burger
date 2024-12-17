import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { ForgotData } from './fp-type';

type Props = {
    forgotData: ForgotData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};

export function FpEmailForm({ onChange, forgotData }: Props) {
    return (
        <>
            <div className='pt-6'>
                <EmailInput
                    onChange={e => onChange(e, 'email')}
                    value={forgotData.email}
                    name={'email'}
                    placeholder='Логин'
                    isIcon={true}
                    extraClass='mb-2'
                />
            </div>

            <div className='pt-6'>
                <Button htmlType='button' type='primary' size='medium'>
                    Восстановить
                </Button>
            </div>
        </>
    );
}
