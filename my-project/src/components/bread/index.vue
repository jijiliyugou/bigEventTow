<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ manage }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ list }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  props: {
    manage: String,
    list: String
  }
};
</script>
<style scoped lang="less"></style>
