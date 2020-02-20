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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="addGoodsData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="name">
            <el-input v-model="addGoodsData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="name">
            <el-input v-model="addGoodsData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="name">
            <el-input v-model="addGoodsData.goods_number"></el-input>
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
      <el-tab-pane label="商品参数" name="second">
        <div v-for="(item, index) in manyData" :key="index">
          <p>{{ item.attr_name }}</p>
          <div>
            <el-checkbox
              border
              v-model="checked"
              v-for="(val, i) in item.attr_vals.split(',')"
              :key="i"
              >{{ val }}</el-checkbox
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        <el-form
          ref="ruleForm"
          label-position="top"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            v-for="(item, index) in onlyData"
            :key="index"
            :label="item.attr_name"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品照片" name="123">
        <el-upload
          class="upload-demo"
          :headers="uploadHead"
          multiple
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture"
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
          :on-preview="uploadPreview"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="456">
        <el-button type="primary" @click="addGoods">添加商品</el-button>
        <!-- 富文本 -->
        <quill-editor
          v-model="addGoodsData.goods_introduce"
          ref="myQuillEditor"
        >
        </quill-editor>
      </el-tab-pane>
    </el-tabs>
    <!-- 预览图片的对话框 -->
    <el-dialog title="收货地址" :visible.sync="uploadDailog">
      <img ref="uploadRef" src="" alt="" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadDailog = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
        label: "cat_name"
      },
      // 商品参数
      manyData: [],
      onlyData: [],
      checked: true,
      // 上传图片请求头
      uploadHead: {
        Authorization: localStorage.getItem("token")
      },
      // 已上传的图片集合
      uploadImg: [],
      uploadDailog: false,
      // 添加商品数据对象
      addGoodsData: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "富文本编辑器中的内容"
      }
    };
  },
  methods: {
    // 获取many&only的数据方法
    getManyOnly(sel) {
      if (this.value.length != 0) {
        this.$http
          .get(
            `categories/${
              this.value[this.value.length - 1]
            }/attributes?sel=${sel}`
          )
          .then(res => {
            const { meta, data } = res.data;
            if (meta.status === 200) {
              if (sel === "many") {
                this.manyData = data;
              } else {
                this.onlyData = data;
              }
            } else {
              this.$message.error(meta.msg);
            }
          });
      } else {
        this.$message.error("请选择商品分类");
      }
    },
    // tabs标签被点击时触发
    tabsClick(tag) {
      this.activeName = tag.name;
      this.active = Number(tag.index);
      if (tag.index === "1") {
        this.getManyOnly("many");
      } else if (tag.index === "2") {
        this.getManyOnly("only");
      }
    },
    // 获取分类数据
    categories() {
      this.$http.get("categories").then(res => {
        const { meta, data } = res.data;
        if (meta.status === 200) {
          this.cateList = data;
        }
      });
    },
    // 图片上传成功的钩子函数
    uploadSuccess(res) {
      this.uploadImg.push(res.data.tmp_path);
    },
    // 删除已上传的图片的钩子
    uploadRemove(file) {
      const img = file.response.data.tmp_path;
      this.uploadImg.forEach((item, index) => {
        if (item === img) {
          this.uploadImg.splice(index, 1);
        }
      });
    },
    // 点击已经上传的图片预览钩子
    uploadPreview(file) {
      const url = file.response.data.url;
      this.uploadDailog = true;
      this.$nextTick(function() {
        this.$refs.uploadRef.src = url;
      });
    },
    // 添加商品
    addGoods() {
      this.addGoodsData.goods_cat = this.value.join(",");
      this.$http({
        url: "goods",
        method: "post",
        data: this.addGoodsData
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 201) {
          this.$message.success(meta.msg);
          this.$router.push("/goods");
        } else {
          this.$message.error(meta.msg);
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
