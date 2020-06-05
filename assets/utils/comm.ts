export function device():number {
  // 获取设备类型 1-安卓 0-ios
  let userAgentInfo: string = navigator.userAgent;
  if (/Android/.test(userAgentInfo)) {
    return 1
  } else if (/iPhone/.test(userAgentInfo)) {
    return 0
  }
  return 0
}