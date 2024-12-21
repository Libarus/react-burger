import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '@services/actions/authSlice';
import { useAppDispatch } from '@services/store';

export function LogoutPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, logout]);

    return <></>;
}
