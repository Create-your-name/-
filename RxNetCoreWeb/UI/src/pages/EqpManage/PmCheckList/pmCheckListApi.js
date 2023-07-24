import { request } from 'umi';

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

/**
 * 查询PM表单CheckList
 * @param {Object} params   - 
 */
 export async function getPMFormCheckList(params) {
    return request('/api/pm/getPMFormCheckList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 更新PM表单
 * @param {Object} params   - 
 */
 export async function updatePMForm(params) {
    return request('/api/pm/updatePMForm', {
        method: 'POST',
        data: params,
    });
}

/**
 * 新增PM表单
 * @param {Object} params   - 
 */
 export async function addPMForm(params) {
    return request('/api/pm/addPMForm', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除PM表单
 * @param {Object} params   - 
 */
 export async function deletePMForm(params) {
    return request('/api/pm/deletePMForm', {
        method: 'POST',
        data: params,
    });
}