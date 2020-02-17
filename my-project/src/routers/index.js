import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Home from "@/views/home";
import Users from "@/views/home/sidebar/users";
import Rights from "@/views/home/sidebar/roles/rights";
import Roles from "@/views/home/sidebar/roles/role";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      // 重定向
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      children: [
        { path: "/users", component: Users },
        { path: "/rights", component: Rights },
        { path: "/roles", component: Roles }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }
  next();
});
export default router;
