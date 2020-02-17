<template>
  <el-card>
    <Bread manage="商品管理" list="商品分类"></Bread>
    <el-button type="success" plain>
      添加分类
    </el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column label="级别" width="180">
        <template slot-scope="scope">
          {{
            scope.row.cat_level === 0
              ? "一级"
              : scope.row.cat_level === 1
              ? "二级"
              : "三级"
          }}
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? "有效" : "无效" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
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
      tableData: [{ name: "张三" }]
    };
  },
  methods: {
    // 获取所有数据
    getTableData() {
      this.$http.get("categories").then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style scoped lang="less">
.el-button {
  margin-top: 20px;
}
</style>
