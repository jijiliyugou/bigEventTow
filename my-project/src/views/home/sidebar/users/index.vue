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
            @change="setStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
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
          <el-button
            type="success"
            size="mini"
            icon="el-icon-check"
            plain
            @click.prevent="openRoles(scope.row)"
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
    <!-- 编辑用户dailog页 -->
    <el-dialog title="修改用户" :visible.sync="EditVisible">
      <el-form
        label-position="right"
        ref="dailogForm"
        status-icon
        :model="editData"
      >
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="editData.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="closeDialog">
        <el-button @click="EditVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="editDailog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置角色dailog页 -->
    <el-dialog title="分配角色" :visible.sync="RolesVisible">
      <el-form
        label-position="right"
        ref="dailogForm"
        status-icon
        :model="RolesName"
      >
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            disabled
            autocomplete="off"
            v-model="RolesName.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="RolesName.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="(item,index) in rolesList" :key="index" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="closeDialog">
        <el-button @click="RolesVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="setRole">确 定</el-button>
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
      },
      // 编辑对话框标识
      EditVisible: false,
      // 编辑数据源
      editData: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      },
      // 角色对话框标识
      RolesVisible: false,
      RolesName: {
        RolesName: "",
        id: null,
        rid: null
      },
      // 角色列表
      rolesList:[]
    };
  },
  methods: {
    // 获取数据
    getTableData() {
      this.$http({
        method: "get",
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          const { meta, data } = res.data;
          if (meta.status === 200) {
            if (data.users.length === 0 && this.pagenum !== 1) {
              this.pagenum--;
              this.getTableData();
              return;
            }
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
                this.getTableData();
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
    },
    // 删除用户列表数据
    danger(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "delete",
            url: `users/${row.id}`,
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(res => {
              const { meta } = res.data;
              if (meta.status === 200) {
                this.$message.success(meta.msg);
                this.getTableData();
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 打开编辑dailog页面
    openEdit(row) {
      this.editData = {
        username: row.username,
        id: row.id,
        email: row.email,
        mobile: row.mobile
      };
      this.EditVisible = true;
    },
    // 确定编辑数据提交
    editDailog() {
      this.$http({
        method: "put",
        url: `users/${this.editData.id}`,
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          id: this.editData.id,
          email: this.editData.email,
          mobile: this.editData.mobile
        }
      })
        .then(res => {
          const { meta } = res.data;
          if (meta.status === 200) {
            this.$message.success(meta.msg);
            this.getTableData();
            this.EditVisible = false;
          } else {
            this.$message.success(meta.msg);
          }
        })
        .catch(err => console.log(err));
    },
    // 打开角色设置面板
    openRoles(row) {
      this.RolesName.username = row.username;
      this.RolesName.id = row.id;
      this.RolesVisible = true;
      this.getRolesById(row.id);
      this.$http({
        method: "get",
        url: "roles",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const{meta,data}=res.data
        if(meta.status === 200){
          this.rolesList = data
        } 
      });
    },
    // 根据id获取角色rid
    getRolesById(id) {
      this.$http({
        method: "get",
        url: "users/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.RolesName.rid = data.rid;
        }
      });
    },
    // 提交设置角色
    setRole(){
      this.$http({
        method:'put',
        url:`users/${this.RolesName.id}/role`,
        data:{
          rid:this.RolesName.rid
        },
        headers:{
          Authorization: localStorage.getItem("token")
        }
      }).then(res=>{
        const{meta} = res.data
        if(meta.status === 200){
          this.$message.success(meta.msg)
          this.getTableData()
          this.RolesVisible = false
        }else{
          this.$message.error(meta.msg)
        }
      })
    },
    // 设置用户状态
    setStatus(row){
    this.$http({
      method:'put',
      url:`users/${row.id}/state/${row.mg_state}`,
      headers:{
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res=>{
      const{meta}=res.data
      this.$message.success(meta.msg)
    })
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
