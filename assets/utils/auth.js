import Cookies from "js-cookie";

const TOKEN_KEY = "jwt"
// 获取token
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
// 设置token
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token);
}
