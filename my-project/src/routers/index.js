import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Home from "@/views/home";
import Users from "@/views/home/sidebar/users";

Vue.use(VueRouter);
export default new VueRouter({
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
      children: [{ path: "/users", component: Users }]
    }
  ]
});
