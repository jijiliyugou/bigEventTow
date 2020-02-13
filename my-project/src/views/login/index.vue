<template>
  <div class="login">
    <div class="content">
      <el-form
        status-icon
        label-width="100px"
        label-position="top"
        class="demo-ruleForm"
        :model="userData"
        :rules="rules"
        ref="ruleForm"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userData.username"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userData.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="login" class="btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        username: null,
        password: null
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "login",
            data: this.userData
          })
            .then(res => {
              const { data, meta } = res.data;
              if (meta.status === 200) {
                this.$message.success(meta.msg);
                localStorage.setItem("token", data.token);
                this.$router.push("/home");
              } else {
                this.$message.error(meta.msg);
                this.userData = {
                  username: null,
                  password: null
                };
              }
            })
            .catch(err => console.log(err));
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background-color: #314052;
  position: relative;
  .content {
    width: 580px;
    height: 440px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 40px;
    box-sizing: border-box;
    .btn {
      width: 100%;
    }
  }
}
</style>
