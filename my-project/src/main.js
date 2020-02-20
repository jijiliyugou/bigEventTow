import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
// 引入axios自定义vue插件
import myAxios from "@/assets/js/myAxios.js";
Vue.use(myAxios);
// 引入el-tree-grid
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);

// 全局引入el-table 上使用无限滚动
import elTableInfiniteScroll from "el-table-infinite-scroll";
Vue.use(elTableInfiniteScroll);

// 引入富文本编辑框
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor);
// 使用map
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "Oul2Cviagu3l9phn9ShA6hGyH5GPDDnB"
});
// 开发模式
Vue.config.productionTip = false;
// 引入全局css样式
import "@/assets/css/index.css";
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
