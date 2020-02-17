<template>
  <el-card>
    <!-- 面包屑 -->
    <Bread manage="权限管理" list="权限列表"></Bread>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      height="300px"
      v-el-table-infinite-scroll="load"
    >
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="authName" label="商品名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          {{
            scope.row.level === "0"
              ? "一级"
              : scope.row.level === "1"
              ? "二级"
              : "三级"
          }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import Bread from "@/components/bread";
export default {
  components: {
    Bread
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getTableData() {
      this.$http.get("rights/list").then(res => {
        console.log(res);
        const { meta, data } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 无线滚动方法
    load() {
      this.$message.success("加载下一页");
      this.tableData = this.tableData.concat(this.tableData);
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style scoped lang="less">
.el-table {
  margin-top: 20px;
}
</style>
