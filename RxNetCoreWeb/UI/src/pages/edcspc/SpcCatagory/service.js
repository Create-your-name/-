import {request } from 'umi';


export async function apiGetCatagory(params) {
  return request('/api/spc-catagory/get-nodes', {
    method: 'POST',
    data: params,
  });
}

export async function apiAddNode(params) {
  return request('/api/spc-catagory/add-node', {
    method: 'POST',
    data: params,
  });
}

export async function apiQueryCatagoryMSpec(params) {
  return request('/api/spc-catagory/QueryCatagoryMSpec', {
    method: 'POST',
    data: params,
  });
}

export async function apiUpdateCatagoryMSpec(params) {
  return request('/api/spc-catagory/UpdateCatagoryMSpec', {
    method: 'POST',
    data: params,
  });
}