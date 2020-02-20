import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
// 引入axios自定义vue插件
import myAxios from "@/assets/js/myAxios.js";
Vue.use(myAxios);

// 引入element相关组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

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

// 开发模式
Vue.config.productionTip = false;
// 引入全局css样式
import "@/assets/css/index.css";
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
