import Cookies from "js-cookie";

const TOKEN_KEY = "jwt"
// 获取token
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
// 设置token
export function setToken(token, options) {
  return Cookies.set(TOKEN_KEY, token, options);
}
// 清除token
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
// 设置session
export function setSession(key, value) {
  return sessionStorage.setItem(key, value);
}
// 获取session
export function getSession(key) {
  return sessionStorage.getItem(key);
}
// 移除session
export function removeSession(key) {
  return sessionStorage.removeItem(key);
}
// 清除session
export function sessionClear() {
  return sessionStorage.clear();
}
