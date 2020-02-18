<template>
  <el-card>
    <Bread manage="商品管理" list="商品分类"></Bread>
    <el-button @click.prevent="openSetAdd" type="success" plain>
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
    <!-- 添加对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addFormVisible">
      <el-form>
        <el-form-item
          label-position="top"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="cateName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="分类名称"
          label-position="left"
          :label-width="formLabelWidth"
        >
          <!-- 级联框 -->
          <el-cascader
            v-model="selValue"
            :props="selProps"
            :options="options"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassify">确 定</el-button>
      </div>
    </el-dialog>
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
      total: null,
      // 添加对话框
      addFormVisible: false,
      formLabelWidth: "80px",
      // 分类名称
      cateName: "",
      // 级联框数据源
      options: [],
      // 级联选中后的数据源
      selValue: [],
      // 级联框配置项
      selProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true
      }
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
    },
    // 打开添加对话框
    openSetAdd() {
      this.addFormVisible = true;
      this.getSelData();
    },
    // 获取级联框数据
    // 获取所有数据
    getSelData() {
      this.$http.get("categories?type=2").then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.options = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 添加分类
    addClassify() {
      let pid =
        this.selValue.length === 0
          ? 0
          : this.selValue[this.selValue.length - 1];
      let level = this.selValue.length;
      this.$http
        .post("categories", {
          cat_pid: pid,
          cat_name: this.cateName,
          cat_level: level
        })
        .then(res => {
          const { meta } = res.data;
          if (meta.status === 201) {
            this.$message.success(meta.msg);
            this.getTableData();
            this.addFormVisible = false;
          } else {
            this.$message.error(meta.msg);
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
