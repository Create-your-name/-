import { request } from 'umi';

/**
 * 查询区域设备列表
 * @param {Object} params   - 
 */
 export async function getAreaEqpList(params) {
    return request('/api/eqp/getAreaEqpList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询设备
 * @param {Object} params   - 
 */
 export async function getEqpDetail(params) {
    return request('/api/eqp/getEqpDetail', {
        method: 'POST',
        data: params,
    });
}