<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <img src="@/assets/img/logo.png" alt="" />
        </el-col>
        <el-col :span="12">
          <h1>Vue 电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <a href="#" class="dropOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {};
</script>
<style scoped lang="less">
.el-container {
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    img {
      height: 60px;
      vertical-align: top;
    }
    h1 {
      margin: 0;
      color: #fff;
    }
    .dropOut {
      float: right;
      text-decoration: none;
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>
