import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthAPI from '@shared/api/auth-api';
import {
    type TAuthRefreshResponse,
    type TForgotRequest,
    type TForgotResponse,
    type TLoginRequest,
    type TLoginResponse,
    type TRegisterRequest,
    type TRegisterResponse,
    type TResetRequest,
    type TResetResponse,
    type TUser,
    type TUserResponse,
} from '@shared/types/tauth';

import { TError } from '@/shared/types/terror';

const authAPI = new AuthAPI();

const initialState: {
    user: TUser | null;
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string;
} = {
    user: null,
    status: 'idle',
    error: '',
};

export const registerThunk = createAsyncThunk<TRegisterResponse, TRegisterRequest>('auth/register', async (body: TRegisterRequest) => {
    try {
        return await authAPI.register(body);
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

export const patchThunk = createAsyncThunk<TRegisterResponse, TRegisterRequest>('auth/patch', async (body: TRegisterRequest) => {
    try {
        return await authAPI.update(body);
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

export const loginThunk = createAsyncThunk<TLoginResponse, TLoginRequest>('auth/login', async (body: TLoginRequest) => {
    try {
        return await authAPI.login(body);
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

export const forgotThunk = createAsyncThunk<TForgotResponse, TForgotRequest>('auth/forgot', async (body: TForgotRequest) => {
    try {
        return await authAPI.passwordForgot(body);
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

export const resetThunk = createAsyncThunk<TResetResponse, TResetRequest>('auth/reset', async (body: TResetRequest) => {
    try {
        return await authAPI.passwordReset(body);
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

export const getUserThunk = createAsyncThunk<TUserResponse, void>('auth/getUser', async () => {
    try {
        return await authAPI.getUser();
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

export const validateTokenThunk = createAsyncThunk<TAuthRefreshResponse | null, void>('auth/validateToken', async () => {
    try {
        return await authAPI.validateToken();
    } catch (e: unknown) {
        const err = e as TError;
        throw new Error(err.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
        },
    },
    extraReducers: builder => {
        // Регистрация пользователя
        builder
            .addCase(registerThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.user;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Обновление пользователя
        builder
            .addCase(patchThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(patchThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.user;
                console.info('patch', action.payload);
            })
            .addCase(patchThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Аутентификация пользователя
        builder
            .addCase(loginThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.user;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Запрос на восстановление пароля пользователя
        builder
            .addCase(forgotThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(forgotThunk.fulfilled, state => {
                state.status = 'success';
            })
            .addCase(forgotThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Смена пароля пользователя
        builder
            .addCase(resetThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(resetThunk.fulfilled, state => {
                state.status = 'success';
            })
            .addCase(resetThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Получение данных пользователя
        builder
            .addCase(getUserThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.user;
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Загрузка ингредиентов
        builder
            .addCase(validateTokenThunk.pending, state => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(validateTokenThunk.fulfilled, state => {
                state.status = 'success';
            })
            .addCase(validateTokenThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
