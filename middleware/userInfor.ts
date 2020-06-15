import { getToken, getSession, setSession } from "~/assets/utils/auth.js"
export default function (context:any) {
  let isClient = process.client; // 客户端
  let token = getToken();
  if (isClient) {
    console.log("context", context)
    // 判断是否有token 如果有token 然后判断是否有用户名，如果没有就拉取用户信息
    if (token) {
      // @ts-ignore
      let user:any = getSession("user") ? JSON.parse(getSession("user")) : null;
      if (!user || !user.nickname) {
        context.$axios({
          method: "POST",
          url: "/usr/user/getUser"
        }).then((res:any) => {
          let data:any = res.data.user
          setSession("user",JSON.stringify(data))
        })
      }
    }
  } 
}