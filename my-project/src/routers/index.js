import Vue from "vue";
import VueRouter from "vue-router";
import Users from "@/views/home/sidebar/users";
import Rights from "@/views/home/sidebar/roles/rights";
import Roles from "@/views/home/sidebar/roles/role";
import Categories from "@/views/home/sidebar/goods/categories";
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
        { path: "/home/users", component: Users },
        { path: "/home/rights", component: Rights },
        { path: "/home/roles", component: Roles },
        { path: "/home/categories", component: Categories }
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
