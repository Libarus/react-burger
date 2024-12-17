import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FpCodeForm } from './fp-code-form';
import { FpEmailForm } from './fp-email-form';
import { ForgotData } from './fp-type';

export function ForgotPassword() {
    const [step, setStep] = useState(0);

    const [forgotData, setForgotData] = useState<ForgotData>({ email: '', password: '', code: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setForgotData(state => {
            return { ...state, [name]: e.target.value };
        });
    };

    return (
        <>
            <div className='text text_type_main-medium'>Восстановление пароля</div>
            
            {step === 0 ? <FpEmailForm onChange={onChange} forgotData={forgotData} /> : <FpCodeForm onChange={onChange} forgotData={forgotData} />}

            <div className='pt-20 text text_type_main-small'>
                Вспомнили пароль?
                <Link to='/login' className='pl-2 button_type_secondary'>
                    Войти
                </Link>
            </div>
        </>
    );
}
