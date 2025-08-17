import { request as h5Request } from "./request-h5";
import { request as wechatRequest } from "./request-wechat";

const resolve: any = {request: null};
if (process.env.TARO_ENV === 'h5') {
  resolve.request = h5Request;
}else {
  resolve.request = wechatRequest;
}

export const request = resolve.request;