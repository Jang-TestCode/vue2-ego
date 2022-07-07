<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="dialogEditVisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form label-width="70px" :model="editFrom" ref="editFrom">
      <el-form-item label="商品类目" prop="TreeData">
        <el-button type="primary" @click="dialogTree" class="treebtn">类目选择</el-button>
        <span style="float: left; margin-left: 10px">
          {{ editFrom.TreeData.name }}
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
        <el-input v-model.trim="editFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model.trim="editFrom.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.trim="editFrom.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model.trim="editFrom.num"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="UploadData">
        <el-button type="primary" @click="dialogUpload" class="treebtn">上传图片</el-button>
        <img class="upload-img" :src="editFrom.UploadData.url" alt="" />
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
        <productwang-editor
          ref="clearEditor"
          @onEditor="getEditor"
          :EditData="EditorData"
        ></productwang-editor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="editProductHeader">确 定</el-button>
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
      dialogEditVisible: false,
      dialogTreeVisible: false,
      dialogUploadVisible: false,
      editFrom: {
        name: '',
        sellPoint: '',
        price: '',
        num: '',
        TreeData: { name: '' }, // 类目选择
        UploadData: { url: '' }, // 存储图片
      },
      EditorData: '', // 富文本数据
      currectData: {},
    }
  },
  components: {
    MyTree,
    ProductUpload,
    ProductwangEditor,
  },
  methods: {
    // 编辑商品 弹窗的关闭事件
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
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
      this.editFrom.TreeData = data
    },
    // 读取上传的图片地址
    getUpload(data) {
      if (data.url) {
        data.url = data.url.replace('upload', base.baseURL)
      }
      this.editFrom.UploadData = data
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
    // 编辑商品事件,重新提交数据
    editProductHeader() {
      this.$http
        .updateTbItem({
          id: this.currectData.id,
          // 将类目的id和cid 都存储在 project表的cid里
          cid: this.editFrom.TreeData.id + '/' + this.editFrom.TreeData.cid,
          title: this.editFrom.name,
          sellPoint: this.editFrom.sellPoint,
          price: this.editFrom.price,
          num: this.editFrom.num,
          image: this.editFrom.UploadData.url,
          descs: this.EditorData,
        })
        .then(res => {
          if (res.data.status === 200) {
            // console.log(res.data)
            this.dialogEditVisible = false
            this.$message({
              message: '商品修改成功',
              type: 'success',
            })
            // 传递事件，通知列表更新
            this.$bus.$emit('refresh', true)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted() {
    // 编辑按钮的事件 弹出编辑商品遮罩
    this.$bus.$on('dialogEdit', row => {
      this.dialogEditVisible = !this.dialogEditVisible
      this.currectData = row
      // 获取预更新数据
      this.$http.proUpdateItem({ id: row.id }).then(res => {
        if (res.data.status === 200) {
          // console.log(res.data.results)
          this.editFrom.name = res.data.results[0].title
          this.editFrom.sellPoint = res.data.results[0].sellPoint
          this.editFrom.price = res.data.results[0].price
          this.editFrom.num = res.data.results[0].num
          this.editFrom.UploadData.url = res.data.results[0].image
          this.EditorData = res.data.results[0].descs
        }
      })
      // 获取预更新数据
      // 先件project表的 cid 里的 id 和 cid 拆分为数组
      const cid = row.cid.split('/')
      this.$http.proTreeUpdateItem({ id: cid[0], cid: cid[1] }).then(res => {
        if (res.data.status === 200) {
          // console.log(res.data.results)
          this.editFrom.TreeData.name = res.data.results[0].name
        }
      })
    })
  },
}
</script>

<style lang="less" scoped>
.treebtn {
  float: left;
}
.upload-img {
  width: 200px;
  float: left;
  margin-left: 10px;
}
</style>
