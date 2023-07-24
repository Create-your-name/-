import { request } from 'umi';

/**
 * EqpQuery1
 * @param {Object} params   - 
 */
 export async function eqpQuery1(params) {
    return request('/api/report/eqpQuery1', {
        method: 'POST',
        data: params,
    });
}

/**
 * EqpQuery2
 * @param {Object} params   - 
 */
 export async function eqpQuery2(params) {
    return request('/api/report/eqpQuery2', {
        method: 'POST',
        data: params,
    });
}