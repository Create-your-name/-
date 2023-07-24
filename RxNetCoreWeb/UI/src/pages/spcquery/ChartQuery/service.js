import {request } from 'umi';


export async function apiGetCatagory(params) {
  return request('/api/spc-catagory/get-nodes', {
    method: 'POST',
    data: params,
  });
}

export async function apiGetMeasurespecDatas(params) {
  return request('/api/edc/SpcEdcQueryChartsTxn', {
    method: 'POST',
    data: params,
  });
}

export async function apiEdcQueryData(params) {
  return request('/api/edc/SPCEdcQueryDataTxn', {
    method: 'POST',
    data: params,
  });
}