import {request } from 'umi';


export async function apiGetCatagory(params) {
  return request('/api/spc-catagory/get-nodes', {
    method: 'POST',
    data: params,
  });
}
