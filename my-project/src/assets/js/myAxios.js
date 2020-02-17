// 引入axios请求
import axios from "axios";
const myAxios = {};
myAxios.install = function(Vue) {
  // 统一设置初始API
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
  // 使用axios拦截器统一设置请求头
  axios.interceptors.request.use(function(config) {
    if (!config.url.includes("login")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  });
  Vue.prototype.$http = axios;
};
export default myAxios;
