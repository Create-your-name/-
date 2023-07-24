import {request } from 'umi';


export async function apiGetExampleData() {
  return request('/api/spc/sample-data', {
    method: 'GET'
  });
}

export async function apiGetExampleData2() {
  return request('/api/spc/sample-data2', {
    method: 'GET'
  });
}