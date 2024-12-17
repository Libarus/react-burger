import { Outlet } from 'react-router';

import { AppHeader } from '../../header/app-header/app-header';

export function RootLayout() {
    return (
        <main>
            <AppHeader />
            <div className='app'>
                <Outlet />
            </div>
        </main>
    );
}
