import { logout } from '@services/actions/authSlice';
import { useAppDispatch } from '@services/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TokenService } from '@/services/token.service';

export function LogoutPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        TokenService.ClearTokens();
        navigate('/login');
    }, [dispatch, navigate]);

    return <></>;
}
