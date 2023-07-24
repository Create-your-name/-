import {request } from 'umi';

/**
 * 创建用户账号
 * @param {String} account - 电话号码
 * @param {String} pwd   -  
 * @param {String} authLevel   - 
 * @param {String} token
 */
export async function create(params) {
  return request('/api/user/create', {
    method: 'POST',
    data: params,
  });
}
/**
 * 删除用户账号
 * @param {String} token - token
 * @param {String} account   - 
 */
export async function remove(params) {
  return request('/api/user/remove', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询所有用户
 * @param {String} token - token
 * @param {String} endDate   - 
 */
export async function queryUser(params) {
  return request('/api/user/query', {
    method: 'POST',
    data: params,
  });
}

/******************通用集群配置********************/
/**
 * 获取通用集群配置
 * @param {String} token - token
 * @param {String} name - XXX.json
 */
export async function getCommonClusterSetting(params) {
  return request('/api/setting/get/', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改通用集群配置
 * @param {String} token - token
 * @param {String} name - WeixinPay.json
 * @param {String} data - setting数据
 */
export async function setCommonClusterSetting(params) {
  return request('/api/setting/set/', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询所有岗位
 * @param {String} token - token
 * @param {String} endDate   - 
 */
 export async function apiQueryPost(params) {
  return request('/api/system/post/list', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除岗位
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiRemovePost(params) {
  return request('/api/system/post/remove', {
    method: 'POST',
    data: params,
  });
}

/**
 * 创建岗位
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiCreatePost(params) {
  return request('/api/system/post/create', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改岗位
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiAlertPost(params) {
  return request('/api/system/post/alert', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改角色
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiAlertRole(params) {
  return request('/api/role/update', {
    method: 'POST',
    data: params,
  });
}

/**
 * 创建角色
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiCreateRole(params) {
  return request('/api/role/create', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除角色
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiRemoveRole(params) {
  return request('/api/role/delete', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询所有角色
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiQueryRole(params) {
  return request('/api/role/select', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改用户
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiAlertUser(params) {
  return request('/api/user/update', {
    method: 'POST',
    data: params,
  });
}

/**
 * 创建用户
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiCreateUser(params) {
  return request('/api/user/create', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除用户
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiRemoveUser(params) {
  return request('/api/user/remove', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询所有用户
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiQueryUser(params) {
  return request('/api/user/query', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改用户密码
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiAlertUserPassword(params) {
  return request('/api/user/resetpwd', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询所有部门
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiQueryDept(params) {
  return request('/api/dept/selectalldept', {
    method: 'POST',
    data: params,
  });
}

/**
 * 创建部门
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiCreateDept(params) {
  return request('/api/dept/create', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除部门
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiRemoveDept(params) {
  return request('/api/dept/delete', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改部门
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiAlertDept(params) {
  return request('/api/dept/update', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取部门下拉框数据
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiGetDeptTreeSelectData(params) {
  return request('/api/dept/depttreeselect', {
    method: 'GET',
    data: params,
  });
}

/**
 * 查询所有菜单
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiQueryMenu(params) {
  return request('/api/menu/select', {
    method: 'POST',
    data: params,
  });
}

/**
 * 创建菜单
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiCreateMenu(params) {
  return request('/api/menu/create', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除菜单
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiRemoveMenu(params) {
  return request('/api/menu/delete', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改菜单
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiAlertMenu(params) {
  return request('/api/menu/update', {
    method: 'POST',
    data: params,
  });
}

/**
 * 创建角色菜单关联
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiCreateRoleMenu(params) {
  return request('/api/role_menu/create', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询角色菜单关联
 * @param {String} token - token
 * @param {String} account   - 
 */
 export async function apiSelectRoleMenuByRole_ID(params) {
  return request('/api/role_menu/selectbyid', {
    method: 'POST',
    data: params,
  });
}