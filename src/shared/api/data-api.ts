import { type TErrorFn } from '../types/terror';
import { type TInternalData } from '../types/tinternal-data';
import { type TOrderRequest, TOrderResponse } from '../types/torder';

import BaseAPI from './base-api';
import { getResponseOrThrow } from './getResponseOrThrow/getResponseOrThrow';

export default class DataAPI extends BaseAPI {
    getData(cb: (data: TInternalData) => void, errorCb: TErrorFn): Promise<void> {
        return this.get('/ingredients')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(cb)
            .catch(errorCb);
    }

    saveOrder(data: TOrderRequest, cb: (p: TOrderResponse) => void, errorCb: TErrorFn): Promise<unknown> {
        return this.post<TOrderRequest>('/orders', data, 'same-origin')
            .then(async response => await (await getResponseOrThrow(response)).json())
            .then(cb)
            .catch(errorCb);
    }
}
