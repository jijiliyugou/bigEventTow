<template>
  <el-card>
    <!-- 面包屑组件 -->
    <Bread manage="商品管理" list="商品列表"></Bread>
    <!-- 提示框 -->
    <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品照片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs -->
    <el-tabs
      v-model="activeName"
      tabPosition="left"
      @tab-click="tabsClick"
      style="margin-bottom: 30px;"
    >
      <el-tab-pane label="基本信息" name="first">
        <el-form
          ref="ruleForm"
          label-position="top"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="基本信息" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="name">
            <el-cascader
              clearable
              :props="config"
              v-model="value"
              :options="cateList"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品照片" name="123">商品照片</el-tab-pane>
      <el-tab-pane label="商品内容" name="456">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import Bread from "../bread";
export default {
  components: {
    Bread
  },
  data() {
    return {
      active: 0,
      activeName: "first",
      // 级联框数据源
      cateList: [],
      // 级联框选中项
      value: [],
      // 级联框配置项
      config: {
        value: "cat_id",
        label: "cat_name",
        checkStrictly: true
      }
    };
  },
  methods: {
    // tabs标签被点击时触发
    tabsClick(tag) {
      this.activeName = tag.name;
      this.active = Number(tag.index);
    },
    // 获取分类数据
    categories() {
      this.$http.get("categories").then(res => {
        const { meta, data } = res.data;
        if (meta.status === 200) {
          console.log(data);
          this.cateList = data;
        }
      });
    }
  },
  mounted() {
    this.categories();
  }
};
</script>
<style scoped lang="less">
.el-alert {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-step__title.is-wait {
  font-size: 12px;
}
.el-step__title.is-process {
  font-size: 12px;
}
.el-tabs {
  margin-top: 20px;
}
</style>
