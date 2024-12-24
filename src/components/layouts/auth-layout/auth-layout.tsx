import { Navigate, Outlet } from 'react-router-dom';

import alstyle from './auth-layout.module.css';
import { TokenService } from '@/services/token.service';

export function AuthLayout() {
    return (
        <>
            {TokenService.GetAccessToken() && <Navigate to='/profile' replace />}
            <div className={`${alstyle.authLayout}`}>
                <Outlet />
            </div>
        </>
    );
}
