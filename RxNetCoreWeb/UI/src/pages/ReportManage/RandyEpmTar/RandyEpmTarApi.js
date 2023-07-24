import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getRandyEpmTar() {
    return request('/api/report/getRandyEpmTar', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addRandyEpmTar(params) {
    return request('/api/report/addRandyEpmTar', {
        method: 'POST',
        data: params,
    });
}

/**
 * 修改
 * @param {Object} params   - 
 */
 export async function updateRandyEpmTar(params) {
    return request('/api/report/updateRandyEpmTar', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delRandyEpmTar(params) {
    return request('/api/report/delRandyEpmTar', {
        method: 'POST',
        data: params,
    });
}
