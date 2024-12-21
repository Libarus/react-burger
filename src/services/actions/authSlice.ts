import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AuthAPI from '@shared/api/auth-api';
import {
    TAuthRefreshResponse,
    TLoginRequest,
    TLoginResponse,
    type TRegisterRequest,
    type TRegisterResponse,
    type TUser,
} from '@shared/types/tauth';

const authAPI = new AuthAPI();

const initialState: {
    user: TUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    registerStatus: 'idle' | 'pending' | 'success' | 'failed';
    error: string;
} = {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    registerStatus: 'idle',
    error: '',
};

export const registerThunk = createAsyncThunk<TRegisterResponse, TRegisterRequest>('auth/register', async (body: TRegisterRequest) => {
    try {
        return await authAPI.register(body);
    } catch (e: any) {
        console.error('register error', e.message);
        throw new Error(e.message);
    }
});

export const loginThunk = createAsyncThunk<TLoginResponse, TLoginRequest>('auth/login', async (body: TLoginRequest) => {
    try {
        return await authAPI.login(body);
    } catch (e: any) {
        console.error('register error', e.message);
        throw new Error(e.message);
    }
});

export const validateTokenThunk = createAsyncThunk<TAuthRefreshResponse | null, void>('auth/validateToken', async (_: any) => {
    try {
        return await authAPI.validateToken();
    } catch (e: any) {
        console.error('validateToken error', e.message);
        throw new Error(e.message);
    }
});

/*
export const getUser = createAsyncThunk<TRegisterResponse, void, { rejectValue: string; fulfillWithValue: string }>(
    'auth/getUser',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        let isOk = false;
        let data: TRegisterResponse = {} as TRegisterResponse;
        let error: Error = {} as Error;

        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token && refreshToken) {
            await authAPI.getUser(
                (d: TRegisterResponse) => {
                    data = d;
                    isOk = true;
                },
                (e: Error) => {
                    console.info('111', e);
                    error = e;
                    if (e.message == 'jwt expired') {
                        console.info('222');
                        authAPI.refreshToken(
                            (d: TAuthRefreshResponse) => {
                                console.info('refresh',d);
                                authAPI.getUser(
                                    (d: TRegisterResponse) => {
                                        data = d;
                                        isOk = true;
                                    },
                                    (e: Error) => {
                                        error = e;
                                    },
                                );
                            },
                            (e: Error) => {
                                console.info('333', e);
                                error = e;
                            },
                        );
                    }
                },
            );
        }

        if (isOk) return fulfillWithValue(data);
        return rejectWithValue(error.message);
    },
);

function saveTokens(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
}

function clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}
*/

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
    extraReducers: builder => {
        // Регистрация пользователя
        builder
            .addCase(registerThunk.pending, state => {
                state.registerStatus = 'pending';
                state.error = '';
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.registerStatus = 'success';
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Аутентификация пользователя
        builder
            .addCase(loginThunk.pending, state => {
                state.registerStatus = 'pending';
                state.error = '';
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.registerStatus = 'success';
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        // Загрузка ингредиентов
        builder
            .addCase(validateTokenThunk.pending, state => {
                state.registerStatus = 'pending';
                state.error = '';
            })
            .addCase(validateTokenThunk.fulfilled, (state, action) => {
                state.registerStatus = 'success';
                if (action.payload !== null) {
                    console.info('1>> ***************************************');
                    console.info(action.payload);
                    console.info('2>> ***************************************');
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                }
            })
            .addCase(validateTokenThunk.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });

        /*
        // Получение пользователя
        builder
            .addCase(getUser.pending, state => {
                state.checkStatus = 'pending';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.checkStatus = 'success';
                state.user = action.payload.user;
                if (action.payload.accessToken, action.payload.refreshToken) {
                    saveTokens(action.payload.accessToken, action.payload.refreshToken);
                }
            })
            .addCase(getUser.rejected, state => {
                clearTokens
                state.checkStatus = 'failed';
            });
        */
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
