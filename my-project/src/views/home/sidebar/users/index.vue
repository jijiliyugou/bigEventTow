<template>
  <el-card class="box-card">
    <!-- 面包屑组件 -->
    <Bread></Bread>
    <!-- 搜索框 -->
    <el-row class="myRow" :gutter="10">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          @keyup.enter.native="searchKey"
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
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      :page-sizes="pageSizes"
      :page-size="pagesize"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 新增dailog页 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible">
      <el-form
        label-position="right"
        ref="dailogForm"
        :rules="onMyRules"
        status-icon
        :model="formData"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="formData.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="closeDialog">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="addDailog">确 定</el-button>
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
      query: "",
      pagenum: 1,
      pagesize: 3,
      total: null,
      // 容量选项
      pageSizes: [2, 3, 5],
      dialogVisible: false,
      formLabelWidth: "80px",
      // 表单数据
      formData: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // dailog表单验证
      onMyRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 11, message: "长度在 2 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "长度不能小于3", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getTableData() {
      this.$http({
        method: "get",
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          const { meta, data } = res.data;
          if (meta.status === 200) {
            this.total = data.total;
            this.tableData = data.users;
          }
        })
        .catch(err => console.log(err));
    },
    currentChange(val) {
      this.pagenum = val;
      this.getTableData();
    },
    sizeChange(val) {
      this.pagesize = val;
      this.getTableData();
    },
    // 搜索功能
    search() {
      this.getTableData();
      this.query = "";
    },
    // 回车搜索功能
    searchKey() {
      this.getTableData();
      this.query = "";
    },
    // 打开新增页面
    openAddDialog() {
      this.dialogVisible = true;
    },
    // 确定新增功能
    addDailog() {
      this.$refs.dailogForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "users",
            data: this.formData,
            headers: { Authorization: localStorage.getItem("token") }
          })
            .then(res => {
              const { meta } = res.data;
              if (meta.status === 201) {
                this.$message.success(meta.msg);
                this.formData = {
                  username: "",
                  password: "",
                  email: "",
                  mobile: ""
                };
                this.dialogVisible = false;
              } else {
                this.$message.error(meta.msg);
                return false;
              }
            })
            .catch(err => console.log(err));
        } else {
          this.dialogVisible = false;
          return false;
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
.myRow {
  margin-top: 20px;
}
</style>
