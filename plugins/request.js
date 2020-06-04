
export default function ({store, redirect, app: { $axios }})  {
  // 数据访问前缀
  $axios.setBaseURL(process.env.BASE_URL);
  $axios.setTimeOut(10);
	// request拦截器，我这里设置了一个token，当然你可以不要
	$axios.onRequest(config => {
		console.log("config", config);
	})
	$axios.onError(error => {
		console.log("error", error);
	})
	// response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(response => {
    let data = response.data;
    return data
	})
}
