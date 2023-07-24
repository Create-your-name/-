import { request } from 'umi';

/**
 * 查询measurementSpec
 * @param {Object} params   - 
 */
export async function queryMeasurementSpec(params) {
    return request('/api/edc/QueryEdcMeasurementSpecs', {
        method: 'POST',
        data: params,
    });
}