export type TUser = {
    name: string;
    email: string;
};

export type TRegisterRequest = {
    name: string;
    email: string;
    password: string;
};

export type TRegisterResponse = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TLoginRequest = {
    email: string;
    password: string;
};

export type TLoginResponse = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TAuthRefreshRequest = {
    token: string;
};

export type TAuthRefreshResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};
