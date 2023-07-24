import { request } from 'umi';

/**
 * 查询设备部件
 * @param {Object} params   - 
 */
 export async function getEqpParts(params) {
    return request('/api/eqp/getEqpParts', {
        method: 'POST',
        data: params,
    });
}

/**
 * 新增设备部件
 * @param {Object} params   - 
 */
 export async function addEqpParts(params) {
    return request('/api/eqp/addEqpParts', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除设备部件
 * @param {Object} params   - 
 */
 export async function deleteEqpParts(params) {
    return request('/api/eqp/deleteEqpParts', {
        method: 'POST',
        data: params,
    });
}

/**
 * 更新设备部件
 * @param {Object} params   - 
 */
 export async function updateEqpParts(params) {
    return request('/api/eqp/updateEqpParts', {
        method: 'POST',
        data: params,
    });
}