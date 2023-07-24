import {request } from 'umi';


export async function apiGetAppSettingV(params) {
  return request('/api/setting/getv', {
    method: 'POST',
    data: params,
  });
}

export async function apiSetAppSettingV(params) {
    return request('/api/setting/setv', {
      method: 'POST',
      data: params,
    });
  }