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
// 时间格式化
export const customFormat = function(date:any, fmt:string):string {
  if (/^-/.test(date) || date === "0000-00-00 00:00:00") {
    return "-";
  }
  let _date;
  if (typeof date === "string") {
    if (/^[0-9]+$/.test(date)) {
      _date = Number(date);
    } else {
      _date = date;
    }
  } else {
    let timeRub = new Date(date).getTime();
    _date = timeRub;
  }
  _date = new Date(_date);
  let o:any = {
    "M+": _date.getMonth() + 1, // 月份
    "d+": _date.getDate(), // 日
    "h+": _date.getHours(), // 小时
    "m+": _date.getMinutes(), // 分
    "s+": _date.getSeconds(), // 秒
    "q+": Math.floor((_date.getMonth() + 3) / 3), // 季度
    S: _date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (_date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

// 下载文件
export const downFile = function (url:string):void {
  let a:any = document.createElement("a");
  a.href = url;
  a.download = "file"
  a.click()
}
