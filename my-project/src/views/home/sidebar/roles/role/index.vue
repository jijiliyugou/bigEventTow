<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <Bread :manage="manage" :list="roleList"></Bread>
    <el-button class="myBtn">添加角色</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
            <el-col :span="4"
              ><el-tag
                closable
                @close="delRight(scope.row.id, item1.id, scope)"
                >{{ item1.authName }}</el-tag
              ></el-col
            >
            <!-- 一级权限 -->
            <el-col :span="20">
              <el-row v-for="(item2, index2) in item1.children" :key="index2">
                <!-- 二级权限 -->
                <el-col :span="4"
                  ><el-tag
                    closable
                    type="success"
                    @close="delRight(scope.row.id, item2.id, scope)"
                    >{{ item2.authName }}</el-tag
                  ></el-col
                >
                <!-- 三级权限 -->
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    v-for="(item3, index3) in item2.children"
                    :key="index3"
                    @close="delRight(scope.row.id, item3.id, scope)"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="id"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click.prevent="openRole(scope.row.children, scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限面板 -->
    <el-dialog title="分配权限" :visible.sync="roleVisible">
      <el-tree
        ref="refRole"
        :data="RoleData"
        default-expand-all
        :props="defaultProps"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultChecked"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
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
      manage: "权限管理",
      roleList: "角色列表",
      // 表格数据
      tableData: [],
      // 分配权限面板
      roleVisible: false,
      RoleData: [
        {
          date: "asdas",
          name: "张三",
          address: "深圳"
        }
      ],
      // tree配置项
      defaultProps: {
        children: "children",
        label: "authName"
      },
      // 默认选中项
      defaultChecked: [],
      // 设置权限的id
      setRoleRid: null
    };
  },

  methods: {
    // 获取角色列表
    getTableData() {
      this.$http.get("roles").then(res => {
        const { meta, data } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      });
    },
    // 删除权限
    delRight(rid, rightId, scope) {
      this.$http.delete(`roles/${rid}/rights/${rightId}`).then(res => {
        const { meta, data } = res.data;
        if (meta.status === 200) {
          scope.row.children = data;
          this.$message.success(meta.msg);
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 打开分配权限面板
    openRole(row, rid) {
      this.setRoleRid = rid;
      this.defaultChecked = [];
      this.roleVisible = true;
      this.$http.get(`rights/tree`).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.RoleData = data;
          this.$message.success(meta.msg);
          row.forEach(item1 => {
            item1.children.forEach(item2 => {
              item2.children.forEach(item3 => {
                this.defaultChecked.push(item3.id);
              });
            });
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 设置权限
    setRole() {
      let checkedKeys = this.$refs.refRole.getCheckedKeys();
      let halfCheckedKeys = this.$refs.refRole.getHalfCheckedKeys();
      const rids = [...checkedKeys, ...halfCheckedKeys].join(",");
      this.$http({
        method: "post",
        url: `roles/${this.setRoleRid}/rights`,
        data: {
          rids: rids
        }
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 200) {
          this.$message.success(meta.msg);
          this.getTableData();
        } else {
          this.$message.error(meta.msg);
        }
        this.roleVisible = false;
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style scoped lang="less">
.myBtn {
  margin-top: 20px;
}
.el-tag {
  margin: 10px;
}
</style>
