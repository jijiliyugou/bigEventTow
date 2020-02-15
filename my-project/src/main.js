import Vue from "vue";
import App from "./App.vue";
import router from "./routers";

// 引入axios请求
import axios from "axios";
import VueAxios from "vue-axios";
// 统一设置初始API
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
// 统一设置请求头
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

Vue.use(VueAxios, axios);
// 引入element相关组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;
// 引入全局css样式
import "@/assets/css/index.css";
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
