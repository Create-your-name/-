import { request } from 'umi';

/**
 * 查询PM
 * @param {Object} params   - 
 */
export async function getPMList(params) {
    return request('/api/pm/getPMList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 更新PM
 * @param {Object} params   - 
 */
 export async function updatePM(params) {
    return request('/api/pm/updatePM', {
        method: 'POST',
        data: params,
    });
}

/**
 * 新增PM
 * @param {Object} params   - 
 */
 export async function addPM(params) {
    return request('/api/pm/addPM', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除PM
 * @param {Object} params   - 
 */
 export async function deletePM(params) {
    return request('/api/pm/deletePM', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除已生成计划的PM
 * @param {Object} params   - 
 */
 export async function deletePMDirect(params) {
    return request('/api/pm/deletePMDirect', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询设备类型
 * @param {Object} params   - 
 */
 export async function getEqpType(params) {
    return request('/api/pm/getEqpType', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询PM表单
 * @param {Object} params   - 
 */
 export async function getPMForm(params) {
    return request('/api/pm/getPMForm', {
        method: 'POST',
        data: params,
    });
}