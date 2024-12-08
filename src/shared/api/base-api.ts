export default class BaseAPI {
    static host = 'https://norma.nomoreparties.space';

    get(url: string): Promise<Response> {
        return fetch(BaseAPI.host + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
    }

    post<TRequest>(url: string, data: TRequest, credentials = 'include') {
        return fetch(BaseAPI.host + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            credentials: credentials === 'include' ? 'include' : 'same-origin',
            body: JSON.stringify(data),
        });
    }
}
