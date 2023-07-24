import { request } from 'umi';

/**
 * 查询chatTemplate
 * @param {Object} params   - 
 */
export async function queryChatTemplatec(params) {
    return request('/api/edc/QueryEdcChartTemplates', {
        method: 'POST',
        data: params,
    });
}