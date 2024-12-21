import { TAuthRefreshRequest, TAuthRefreshResponse, TLoginRequest, TLoginResponse, TRegisterRequest, TRegisterResponse } from '../types/tauth';
import { type TErrorFn } from '../types/terror';

import BaseAPI from './base-api';
import { getResponseOrThrow } from './getResponseOrThrow/getResponseOrThrow';

export default class AuthAPI extends BaseAPI {
    register(data: TRegisterRequest): Promise<TRegisterResponse> {
        return this.post<TRegisterRequest>('/auth/register', data, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: any) => {
                console.error('e', error);
                throw new Error(error.message);
            });
    }

    login(data: TLoginRequest): Promise<TLoginResponse> {
        return this.post<TLoginRequest>('/auth/login', data, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: any) => {
                throw new Error(error.message);
            });
    }

    refreshToken2(): Promise<TAuthRefreshResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken == null) {
            return Promise.reject();
        }
        console.info('c');
        return this.post<TAuthRefreshRequest>('/auth/token', { token: refreshToken }, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: any) => {
                console.error('e', error);
                throw new Error(error.message);
            });
    }

    getUser(cb: (p: TRegisterResponse) => void, errorCb: TErrorFn): Promise<unknown> {
        return this.get('/auth/user')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(cb)
            .catch(errorCb);
    }

    isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }

    async validateToken() {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
            throw new Error('Нет токенов');
        }

        // Если основной токен просрочен, пробуем обновить
        if (this.isTokenExpired(accessToken)) {
            try {
                return await this.refreshToken2();
            } catch {
                throw new Error('Не удалось обновить токен');
            }
        }

        return null;
    }
}
