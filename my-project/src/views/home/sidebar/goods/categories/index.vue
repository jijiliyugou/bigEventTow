<template>
  <el-card>
    <Bread manage="商品管理" list="商品分类"></Bread>
    <el-button type="success" plain>
      添加分类
    </el-button>
    <!-- 表格 -->
    <el-table :data="pageList" style="width: 100%">
      <el-table-tree-column
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        prop="cat_name"
        label="分类名称"
        width="180"
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
      >
      </el-table-tree-column>
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
      @size-change="sizeChange"
      @current-change="pagenumChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
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
      tableData: [],
      // 分页数据源
      pageList: [],
      pagesize: 5,
      pagenum: 1,
      total: null
    };
  },
  methods: {
    // 获取所有数据
    getTableData() {
      this.$http.get("categories").then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
          this.total = data.length;
          this.getPageList();
        }
      });
    },
    // 获取分页数据
    getPageList() {
      let begin = this.pagesize * (this.pagenum - 1);
      let end = this.pagesize * this.pagenum;
      this.pageList = this.tableData.slice(begin, end);
    },
    // 页码发生改变
    pagenumChange(val) {
      this.pagenum = val;
      this.getPageList();
    },
    // 页容量发生改变
    sizeChange(val) {
      this.pagesize = val;
      this.getPageList();
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
