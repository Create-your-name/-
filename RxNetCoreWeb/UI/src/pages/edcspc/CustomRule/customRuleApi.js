import { request } from 'umi';

/**
 * 查询customRule
 * @param {Object} params   - 
 */
export async function queryCustomRule(params) {
    return request('/api/edc/QueryEdcCustomRules', {
        method: 'POST',
        data: params,
    });
}