import { request } from 'umi';

/**
 * 查询BM表单
 * @param {Object} params   - 
 */
 export async function getBMForm(params) {
    return request('/api/bm/getBMForm', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询BM表单CheckList
 * @param {Object} params   - 
 */
 export async function getBMFormCheckList(params) {
    return request('/api/bm/getBMFormCheckList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 更新BM表单
 * @param {Object} params   - 
 */
 export async function updateBMForm(params) {
    return request('/api/bm/updateBMForm', {
        method: 'POST',
        data: params,
    });
}

/**
 * 新增BM表单
 * @param {Object} params   - 
 */
 export async function addBMForm(params) {
    return request('/api/bm/addBMForm', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除BM表单
 * @param {Object} params   - 
 */
 export async function deleteBMForm(params) {
    return request('/api/bm/deleteBMForm', {
        method: 'POST',
        data: params,
    });
}