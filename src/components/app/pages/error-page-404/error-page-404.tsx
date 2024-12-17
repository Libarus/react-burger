import { Link } from 'react-router-dom';

export const ErrorPage404 = () => {
    return (
        <div className='p-25'>
            <div className='text text_type_digits-large'>404</div>
            <div className='text text_type_main-large pt-5'>Как вы сюда попали?</div>
            <div className='text text_type_main-medium pt-5'>Нет тут ничего!</div>
            <div className='text text_type_main-small pt-5'>
                <Link to='/'>Идите на главную!</Link>
            </div>
        </div>
    );
};
