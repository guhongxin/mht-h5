import { getToken } from "~/assets/utils/auth.js"
export default function (context:any) {
  let isClient = process.client;
  let token = getToken();
  let redirectURL = '/login';
  if (isClient) {
    // 判断是否是客户端，如果是判断token 是否存在,不存在重定向登录界面
    if (!token) {
      (context as any).redirect(redirectURL)
    }
  }
}