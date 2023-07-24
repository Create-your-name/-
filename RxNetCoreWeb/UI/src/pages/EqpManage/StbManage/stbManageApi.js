import { request } from 'umi';

/**
 * 查询备件
 * @param {Object} params   - 
 */
export async function getEqpParts(params) {
  return request('/api/BackPar/getBackParForm', {
    method: 'POST',
    data: params,
  });
}


/**
 * 新增备件
 * @param {Object} params   - 
 */
export async function addEqpParts(params) {
  return request('/api/BackPar/addParts', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新备件
 * @param {Object} params   - 
 */
export async function updateEqpParts(params) {
  return request('/api/BackPar/updateEqpParts', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除备件
 * @param {Object} params   - 
 */
export async function deleteEqpParts(params) {
  return request('/api/BackPar/deleteEqpParts', {
    method: 'POST',
    data: params,
  });
}


/**
 * 核对数据
 * @param {Object} params   - 
 */
export async function ConfirmData(params) {
  return request('/api/BackPar/ConfirmData', {
    method: 'POST',
    data: params,
  });
}
