import axios from 'axios'
import router from '../router/index'
import { ElMessage } from "element-plus";
let token = sessionStorage.getItem('token');
const service = axios.create({
	baseURL: 'http://localhost:8081', // 所有的请求地址前缀部分
	timeout: 60000, // 请求超时时间毫秒
	withCredentials: true, // 异步请求携带cookie
	headers: {
		'Content-Type': 'application/json',
		'token': token,	
		'X-Requested-With': 'XMLHttpRequest',
	},
})

// 添加请求拦截器
service.interceptors.request.use(


	async config => {
		// 每次发送请求之前判断vuex中是否存在token    
		if (token !== null) {
		
			ElMessage({
				message: "token已过期,请重新登录",
				type: "error",
			});
			router.push('/login')
			// return代表不往下执行，所以这个请求不会发送
			return
			// config.headers.Authorization = 'Bearer ' + getToken()
			// config.headers['Bearer'] = getToken()
			// config.headers.tenantid =  getTenantId ()
		}


		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
		// config.headers.token = sessionStorage.getItem('token')
		return config;
	},
	error => {
		return Promise.error(error);
	})


// 添加响应拦截器
service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response); //进行中        
		} else {
			return Promise.reject(response); //失败       
		}
	},

	// 服务器状态码不是200的情况    
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录                
				// 未登录则跳转登录页面，并携带当前页面的路径                
				// 在登录成功后返回当前页面，这一步需要在登录页操作。                
				case 401:
					break
				// 403 token过期                
				// 登录过期对用户进行提示                
				// 清除本地token和清空vuex中token对象                
				// 跳转登录页面                
				case 403:
					// await store.dispatch('user/logout')
					// Message.warning('登录状态过期，请重新登录！')
					sessionStorage.clear()
					router.push('/login')
					break
				// 404请求不存在                
				case 404:
					break;
				// 其他错误，直接抛出错误提示                
				default:
			}
			return Promise.reject(error.response);
		}
	}

)



export default service
