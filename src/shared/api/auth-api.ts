import {
    type TAuthRefreshRequest,
    type TAuthRefreshResponse,
    type TForgotRequest,
    type TForgotResponse,
    type TLoginRequest,
    type TLoginResponse,
    type TRegisterRequest,
    type TRegisterResponse,
    type TResetRequest,
    type TResetResponse,
    type TUserResponse,
} from '../types/tauth';
import { TError } from '../types/terror';

import BaseAPI from './base-api';
import { getResponseOrThrow } from './getResponseOrThrow/getResponseOrThrow';

export default class AuthAPI extends BaseAPI {
    register(data: TRegisterRequest): Promise<TRegisterResponse> {
        return this.post<TRegisterRequest>('/auth/register', data, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                throw new Error(error.message);
            });
    }

    update(data: TRegisterRequest): Promise<TRegisterResponse> {
        return this.patch<TRegisterRequest>('/auth/user', data, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                throw new Error(error.message);
            });
    }

    login(data: TLoginRequest): Promise<TLoginResponse> {
        return this.post<TLoginRequest>('/auth/login', data, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                throw new Error(error.message);
            });
    }

    passwordForgot(body: TForgotRequest): Promise<TForgotResponse> {
        return this.post<TForgotRequest>('/password-reset', body, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                throw new Error(error.message);
            });
    }

    passwordReset(body: TResetRequest): Promise<TResetResponse> {
        return this.post<TResetRequest>('/password-reset/reset', body, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                throw new Error(error.message);
            });
    }

    getUser(): Promise<TUserResponse> {
        return this.get('/auth/user')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                throw new Error(error.message);
            });
    }

    refreshToken(): Promise<TAuthRefreshResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken == null) {
            return Promise.reject();
        }
        console.info('c');
        return this.post<TAuthRefreshRequest>('/auth/token', { token: refreshToken }, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(data => data)
            .catch((error: TError) => {
                console.error('e', error);
                throw new Error(error.message);
            });
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
                return await this.refreshToken();
            } catch {
                throw new Error('Не удалось обновить токен');
            }
        }

        return null;
    }
}
