<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <img @click.prevent="toHome" src="@/assets/img/logo.png" alt="" />
    </el-col>
    <el-col :span="12">
      <h1>Vue 电商后台管理系统</h1>
    </el-col>
    <el-col :span="6">
      <a href="#" @click.prevent="dropOut" class="dropOut">退出</a>
    </el-col>
  </el-row>
</template>
<script>
export default {
  methods: {
    // 退出系统
    dropOut() {
      this.$confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    // 点击logo跳转到home主页
    toHome() {
      this.$router.push("/home");
    }
  }
};
</script>
<style scoped lang="less">
img {
  height: 60px;
  vertical-align: top;
  cursor: pointer;
}
h1 {
  margin: 0;
  color: #fff;
}
.dropOut {
  float: right;
  text-decoration: none;
}
</style>
