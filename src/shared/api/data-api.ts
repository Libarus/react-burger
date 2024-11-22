import BaseAPI from './base-api';

import type TInternalData from '../types/tinternal-data';
import type TErrorFn from '../types/terror';

import { getResponseOrThrow } from './getResponseOrThrow/getResponseOrThrow';

export default class DataAPI extends BaseAPI {
    
    getData(cb: (data: TInternalData) => void, errorCb: TErrorFn): Promise<void> {
        return this.get('/api/ingredients')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(cb)
            .catch(errorCb);
    }
}
