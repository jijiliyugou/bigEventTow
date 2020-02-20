import Vue from "vue";
import VueRouter from "vue-router";

const Users = () => import("@/views/home/sidebar/users");
const Rights = () => import("@/views/home/sidebar/roles/rights");
const Roles = () => import("@/views/home/sidebar/roles/role");
const Categories = () => import("@/views/home/sidebar/categories");
const GoodsList = () => import("@/views/home/sidebar/goods/goods-list.vue");
const Orders = () => import("@/views/home/sidebar/orders");
const GoodsAdd = () => import("@/components/goodsAdd");

import { Message } from "element-ui";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      // 重定向
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home"),
      children: [
        { path: "/users", component: Users },
        { path: "/rights", component: Rights },
        { path: "/roles", component: Roles },
        { path: "/categories", component: Categories },
        { path: "/goods", component: GoodsList },
        { path: "/goodsAdd", component: GoodsAdd },
        { path: "/orders", component: Orders }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = localStorage.getItem("token");
    if (!token) {
      Message.error("您还没有登录，请先登录");
      router.push({
        name: "login"
      });
    }
  }
  next();
});
export default router;
