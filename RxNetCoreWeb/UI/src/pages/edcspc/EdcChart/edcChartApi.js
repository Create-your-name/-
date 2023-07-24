import { request } from 'umi';

/**
 * 查询edcChart
 * @param {Object} params   - 
 */
export async function queryEdcChart(params) {
    return request('/api/edc/QueryEdcCharts', {
        method: 'POST',
        data: params,
    });
}