
import { Dialog, Toast } from 'vant';
export default function ({store, redirect, app: { $axios }})  {
  // 数据访问前缀
	// $axios.setBaseURL(process.env.BASE_URL);
	$axios.defaults.baseURL = process.env.BASE_URL
	$axios.defaults.timeout = 1000
  // $axios.setTimeOut(10);
	// request拦截器，我这里设置了一个token，当然你可以不要
	$axios.onRequest(config => {
		Toast.loading({
			duration: 0, // 持续展示 toast
			forbidClick: true,
			message: '加载中',
		});
	})
	$axios.onError(error => {
		let res = error.response;
		console.log("res", res);
		Toast.clear();
		if (res.status === 400) {
			Dialog({ message: '请求参数不对！' });
		} else if (res.status === 500)  {
			Dialog({ message: '后端报错！' });
		}
	})
	// response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(response => {
		let data = response.data;
		Toast.clear();
    return data
	})
}
