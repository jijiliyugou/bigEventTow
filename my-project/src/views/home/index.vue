<template>
  <el-container>
    <!-- 头部组件 -->
    <el-header>
      <TopHead></TopHead>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <Sidebar></Sidebar>
      <!-- 内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import TopHead from "./top-head";
import Sidebar from "./sidebar";
export default {
  components: {
    TopHead,
    Sidebar
  },
  methods: {},
  mounted() {
    // 进来获取token值
    // if (!localStorage.getItem("token")) {
    //   this.$message.warning("请先登录");
    //   this.$router.push("/login");
    // }
  }
};
</script>
<style scoped lang="less">
.el-container {
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
}
</style>
