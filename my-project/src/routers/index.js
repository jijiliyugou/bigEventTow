import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Home from "@/views/home";

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      // 重定向
      path: "/",
      redirect: "/login"
    }
  ]
});
