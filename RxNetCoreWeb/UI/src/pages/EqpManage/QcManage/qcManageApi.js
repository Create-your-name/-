import { request } from 'umi';

/**
 * 查询QC
 * @param {Object} params   - 
 */
export async function getQCList(params) {
    return request('/api/qc/GetQCList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询EDCPlan
 * @param {Object} params   - 
 */
 export async function getEDCPlan(params) {
    return request('/api/qc/getEDCPlan', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询设备
 * @param {Object} params   - 
 */
 export async function getEqp(params) {
    return request('/api/qc/getEqp', {
        method: 'POST',
        data: params,
    });
}

/**
 * 更新QC
 * @param {Object} params   - 
 */
 export async function updateQC(params) {
    return request('/api/qc/UpdateQC', {
        method: 'POST',
        data: params,
    });
}

/**
 * 新增QC
 * @param {Object} params   - 
 */
 export async function AddQC(params) {
    return request('/api/qc/AddQC', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除QC
 * @param {Object} params   - 
 */
 export async function DeleteQC(params) {
    return request('/api/qc/DeleteQC', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除已生成计划的QC
 * @param {Object} params   - 
 */
 export async function DeleteQCDirect(params) {
    return request('/api/qc/DeleteQCDirect', {
        method: 'POST',
        data: params,
    });
}