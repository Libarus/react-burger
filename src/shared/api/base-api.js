export default class BaseAPI {
    static host = 'https://norma.nomoreparties.space';

    get(url) {
        return fetch(BaseAPI.host + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        });
    }

}
