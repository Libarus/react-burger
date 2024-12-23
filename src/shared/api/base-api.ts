export default class BaseAPI {
    static host = 'https://norma.nomoreparties.space/api';

    headers: Record<string, string> = {
        'Content-Type': 'application/json;charset=utf-8',
    };

    get(url: string): Promise<Response> {
        this.setCredentials();
        return fetch(BaseAPI.host + url, {
            method: 'GET',
            headers: this.headers,
        });
    }

    post<TRequest>(url: string, data: TRequest, credentials = 'include') {
        this.setCredentials();
        return fetch(BaseAPI.host + url, {
            method: 'POST',
            headers: this.headers,
            credentials: credentials === 'include' ? 'include' : 'same-origin',
            body: JSON.stringify(data),
        });
    }

    patch<TRequest>(url: string, data: TRequest, credentials = 'include') {
        this.setCredentials();
        return fetch(BaseAPI.host + url, {
            method: 'PATCH',
            headers: this.headers,
            credentials: credentials === 'include' ? 'include' : 'same-origin',
            body: JSON.stringify(data),
        });
    }

    private setCredentials = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.headers = {
                ...this.headers,
                Authorization: `${accessToken}`,
            };
        }
    };
}
