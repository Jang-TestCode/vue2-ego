<template>
  <el-dialog title="添加商品" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <el-form label-width="70px" :model="addForm" ref="addForm">
      <el-form-item label="商品类目" prop="TreeData">
        <el-button type="primary" @click="dialogTree" style="float: left">类目选择</el-button>
        <span style="float: left; margin-left: 10px">
          {{ addForm.TreeData.name }}
        </span>
        <!-- 选择类目的遮罩 -->
        <el-dialog width="45%" append-to-body title="类目选择" :visible.sync="dialogTreeVisible">
          <!-- 展示类目的组件 -->
          <my-tree @onTree="getTreeData"></my-tree>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTreeVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model.trim="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model.trim="addForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.trim="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model.trim="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="UploadData">
        <el-button type="primary" @click="dialogUpload" style="float: left">上传图片</el-button>
        <img class="upload-img" :src="addForm.UploadData.url" alt="" />
        <!-- 上传图片的遮罩 -->
        <el-dialog width="45%" append-to-body title="上传图片" :visible.sync="dialogUploadVisible">
          <!-- 上传图片的组件 -->
          <product-upload ref="isupload" @onUpload="getUpload"></product-upload>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clear">关 闭</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述" prop="EditorData">
        <!-- 富文本编辑器组件 -->
        <productwang-editor ref="clearEditor" @onEditor="getEditor"></productwang-editor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProductHeader">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyTree from '@/components/MyTree.vue'
import ProductUpload from './ProductUpload.vue'
import ProductwangEditor from './ProductwangEditor.vue'
import base from '@/api/base.js'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogTreeVisible: false,
      dialogUploadVisible: false,
      addForm: {
        name: '',
        sellPoint: '',
        price: '',
        num: '',
        TreeData: {}, // 类目选择
        UploadData: {}, // 存储图片
      },
      EditorData: '', // 富文本数据
    }
  },
  components: {
    MyTree,
    ProductUpload,
    ProductwangEditor,
  },
  methods: {
    // 添加商品 弹窗的关闭事件
    handleClose(done) {
      this.$confirm('关闭会清空当前数据，确认关闭？').then(_ => {
        done()
        this.clearForm()
      })
    },
    //  类目选择按钮 嵌套弹窗 打开
    dialogTree() {
      this.dialogTreeVisible = true
    },
    // 上传图片按钮 嵌套弹窗 打开
    dialogUpload() {
      this.dialogUploadVisible = true
    },
    // 读取类目的数据
    getTreeData(data) {
      this.addForm.TreeData = data
    },
    // 读取上传的图片地址
    getUpload(data) {
      if (data.url) {
        data.url = data.url.replace('upload', base.baseURL)
      }
      this.addForm.UploadData = data
    },
    // 上传图片后的关闭按钮
    clear() {
      this.$refs.isupload.$refs.upload.clearFiles() // 清空上传图片的列表
      this.dialogUploadVisible = false // 关闭图片上传服务器的弹窗
    },

    // 读取富文本编辑器的数据
    getEditor(data) {
      this.EditorData = data
    },
    // 添加商品事件
    addProductHeader() {
      this.$http
        .insertTbItem({
          // 将类目的id和cid 都存储在 project表的cid里
          cid: this.addForm.TreeData.id + '/' + this.addForm.TreeData.cid,
          title: this.addForm.name,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          image: this.addForm.UploadData.url,
          descs: this.EditorData,
        })
        .then(res => {
          if (res.data.status === 200) {
            // 添加成功 关闭添加商品遮罩
            this.dialogVisible = false
            this.$message({
              message: '商品添加成功',
              type: 'success',
            })
            // 传递事件，通知列表和页数更新
            this.$bus.$emit('refresh', true)
            this.clearForm()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 封装 清空表单方法
    clearForm() {
      this.$refs.addForm.resetFields() // 清空表单数据
      this.$refs.clearEditor.editor.clear() // 清空富文本编辑器
    },
  },
  mounted() {
    // 添加按钮的事件 弹出添加商品遮罩
    this.$bus.$on('dialog', () => {
      this.dialogVisible = !this.dialogVisible
    })
  },
}
</script>

<style lang="less" scoped>
.upload-img {
  width: 200px;
  float: left;
  margin-left: 10px;
}
</style>
