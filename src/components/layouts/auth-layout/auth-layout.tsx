import { Navigate, Outlet } from 'react-router-dom';

import alstyle from './auth-layout.module.css';
import { RootState, useAppSelector } from '@/services/store';

export function AuthLayout() {
    const { accessToken } = useAppSelector((state: RootState) => state.auth);

    return (
        <>
            {accessToken && <Navigate to='/profile' replace />}
            <div className={`${alstyle.authLayout}`}>
                <Outlet />
            </div>
        </>
    );
}
