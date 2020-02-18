<template>
  <el-card>
    <!-- 面包屑组件 -->
    <Bread :manage="manage" :list="userList"></Bread>
    <!-- 搜索框 -->
    <el-row class="myRow" :gutter="10">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          @keyup.enter.native="search"
        >
          <el-button
            slot="append"
            @click.prevent="search"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4"
        ><el-button @click.prevent="openAddDialog" type="success"
          >添加用户</el-button
        ></el-col
      >
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="400">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
            @click.prevent="openEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
            @click.prevent="danger(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :page-sizes="pageSizes"
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
      // 父子传值面包屑
      manage: "商品管理",
      userList: "商品列表",
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 10,
      total: null,
      // 容量选项
      pageSizes: [10, 20, 30]
    };
  },
  methods: {
    // 获取数据
    getTableData() {
      this.$http({
        method: "get",
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      })
        .then(res => {
          const { meta, data } = res.data;
          if (meta.status === 200) {
            if (data.goods.length === 0 && this.pagenum !== 1) {
              this.pagenum--;
              this.getTableData();
              return;
            }
            this.total = data.total;
            this.tableData = data.goods;
          }
        })
        .catch(err => console.log(err));
    },
    // 分页页容量发生改变
    sizeChange(val) {
      this.pagesize = val;
      this.getTableData();
    },
    // 分页当前页发生改变
    pageChange(val) {
      this.pagenum = val;
      this.getTableData();
    },
    // 搜索
    search() {
      this.getTableData();
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style scoped lang="less">
.myRow {
  margin-top: 20px;
}
</style>
