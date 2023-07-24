import { request } from 'umi';

/**
 * 查询systemRule
 * @param {Object} params   - 
 */
export async function querySystemRule(params) {
    return request('/api/edc/QueryEdcSystemRules', {
        method: 'POST',
        data: params,
    });
}