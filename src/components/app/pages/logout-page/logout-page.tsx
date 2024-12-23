import { logout } from '@services/actions/authSlice';
import { useAppDispatch } from '@services/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, navigate]);

    return <></>;
}
