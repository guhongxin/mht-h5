
import { Dialog, Toast } from 'vant';
import { getToken, removeToken, sessionClear } from "~/assets/utils/auth.js"

let timer;
export default function ({store, redirect, app: { $axios }})  {
  // 数据访问前缀
	$axios.defaults.baseURL = process.env.BASE_URL
	$axios.defaults.timeout = 10000
	// request拦截器，我这里设置了一个token，当然你可以不要
	$axios.onRequest(config => {
		if (getToken()) {
			config.headers["jwt"] = getToken();
		}
		if (!timer) {
			timer = setTimeout(() =>{
				Toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true,
					message: '加载中',
				});
			}, 3000)
		}
		return config
	})
	$axios.onError(error => {
		let res = error.response;
		clearTimeout(timer);
		Toast.clear();
		if (res) {
			if (res.status === 400) {
				Dialog({ message: '请求参数不对！' });
			} else if (res.status === 500)  {
				Dialog({ message: '后端报错！' });
			}
		} else {
			Dialog({ message: '请求无响应！' });
		}
		return Promise.reject(error)
	})
	// response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(response => {
		let data = response.data;
		clearTimeout(timer);
		Toast.clear();
		return new Promise((resolve, reject) => {
			if (data.code && data.code !== 0) {
				if (data.code === 1003) {
					removeToken()
					sessionClear()
					redirect("/login")
				} else {
					Dialog({ message: data.msg });
					reject(data)
				}
			} else {
				resolve(data)
			}
		})
	})
}
