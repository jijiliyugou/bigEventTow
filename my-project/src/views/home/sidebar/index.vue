<template>
  <el-aside width="200px">
    <el-menu class="el-menu-vertical-demo" unique-opened router>
      <el-submenu v-for="item in menus" :key="item.id" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          v-for="item2 in item.children"
          :key="item2.id"
          :index="item2.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item2.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  methods: {
    getMenusList() {
      this.$http.get("menus").then(res => {
        const { meta, data } = res.data;
        if (meta.status === 200) {
          this.menus = data;
        }
      });
    }
  },
  mounted() {
    this.getMenusList();
  }
};
</script>
<style scoped lang="less">
.el-aside {
  background-color: #fff;
  color: #333;
  line-height: 200px;
  .el-menu {
    height: 100%;
  }
}
</style>
