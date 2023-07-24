import {request } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export async function apiLogin(params: any) : Promise<HResponse> {
  // return {
  //   result:0,
  //   data: {
  //     authToken:"123",
  //     role:"admin",
  //     param:"[]"
  //   }
  // };
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
