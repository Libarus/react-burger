export class TokenService {
    public static GetAccessToken() {
        return localStorage.getItem('accessToken');
    }

    public static SetAccessToken(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
    }

    public static GetRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    public static SetRefreshToken(refreshToken: string) {
        localStorage.setItem('refreshToken', refreshToken);
    }

    public static ClearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}
