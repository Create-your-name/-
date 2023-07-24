import { request } from 'umi';

/**
 * 查询区域设备列表Qc状态
 * @param {Object} params   - 
 */
 export async function getEqpQcList() {
    return request('/api/report/eqpQcQuery', {
        method: 'POST'
    });
}