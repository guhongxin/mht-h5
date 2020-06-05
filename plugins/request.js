
import { Dialog, Toast } from 'vant';
export default function ({store, redirect, app: { $axios }})  {
  // 数据访问前缀
	$axios.defaults.baseURL = process.env.BASE_URL
	$axios.defaults.timeout = 10000
	// request拦截器，我这里设置了一个token，当然你可以不要
	$axios.onRequest(config => {
		Toast.loading({
			duration: 0, // 持续展示 toast
			forbidClick: true,
			message: '加载中',
		});
		config.headers["jwt"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTkzNzYwODQ2ODA0LCJ1c2VySWQiOjEyMzEyMzEyM30.GZRwiKl_V0emjG2bjX0nNVo_V_U4SE-XcFMIWebVmnk"
		console.log("===", config)
		return config
	})
	$axios.onError(error => {
		let res = error.response;
		Toast.clear();
		console.log(res);
		if (res) {
			if (res.status === 400) {
				Dialog({ message: '请求参数不对！' });
			} else if (res.status === 500)  {
				Dialog({ message: '后端报错！' });
			}
		} else {
			Dialog({ message: '请求无响应！' });
		}
	})
	// response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(response => {
		let data = response.data;
		Toast.clear();
    return data
	})
}
