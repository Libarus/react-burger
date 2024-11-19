import BaseAPI from './base-api';

export default class DataAPI extends BaseAPI {
    
    getData(cb, errorCb) {
        return this.get('/api/ingredients')
            .then(async (response) => response.json())
            .then(cb)
            .catch((e) => {
                errorCb(e);
            });
    }
}
