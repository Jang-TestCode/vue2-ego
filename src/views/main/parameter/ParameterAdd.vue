<template>
  <el-dialog
    title="添加规格参数"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <!-- 展示类目的组件 -->
    <my-tree @onTree="getTreeData"></my-tree>
    <el-dialog width="35%" append-to-body title="添加分组" :visible.sync="dialogAddVisible">
      <!-- 添加分组表单 -->
      <el-button size="small" @click="addDomain">添加分组</el-button>
      <el-form :v-model="domaninsAddForm" ref="domaninsAddForm">
        <el-form-item label="商品类目">
          <span style="float: left; margin-left: 10px">{{ treeData.name }}</span>
        </el-form-item>
        <el-form-item
          label="规格参数"
          v-for="(item, index) in domaninsAddForm.domanins"
          :key="index"
        >
          <el-input v-model="item.value" style="width: 86%"></el-input>
          <el-button size="small" round @click="addchild(index)">添加参数</el-button>
          <el-button size="small" round @click="removeDomain(item)">删除分组</el-button>
          <div v-for="(childitem, childindex) in item.children" :key="childindex">
            <el-input
              v-model="childitem.childValue"
              style="width: 65%; margin-left: 40px"
            ></el-input>
            <el-button size="small" round @click="removechild(index, childitem)">
              删除参数
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="parmatSubmit">提 交</el-button>
      </span>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="disabled" @click="dialogAdd">
        确定并添加分组内容
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyTree from '@/components/MyTree.vue'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogAddVisible: false,
      disabled: true,
      // 类目的数据
      treeData: {},
      // 添加分组的视图数据
      domaninsAddForm: {
        // 大分类
        domanins: [
          {
            value: '',
            // 小分类
            children: [
              { childValue: '', value: '' },
              { childValue: '', value: '' },
            ],
          },
        ],
      },
    }
  },
  components: {
    MyTree,
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //  类目选择按钮 嵌套弹窗 打开
    dialogAdd() {
      this.dialogAddVisible = true
    },
    // 读取类目的数据
    getTreeData(data) {
      this.disabled = false
      this.treeData = data
    },
    // 添加分组大分类
    addDomain() {
      this.domaninsAddForm.domanins.push({
        value: '',
        children: [
          { childValue: '', value: '' },
          { childValue: '', value: '' },
        ],
      })
    },
    // 删除分组大分类
    removeDomain(item) {
      const index = this.domaninsAddForm.domanins.indexOf(item) // indexOf查找当前循环项的 索引
      this.domaninsAddForm.domanins.splice(index, 1) // splice方法 删除 索引处的多少数组元素
    },
    // 添加分组小分类参数
    addchild(index) {
      this.domaninsAddForm.domanins[index].children.push({ childValue: '', value: '' })
    },
    // 删除分组小分类参数
    removechild(index, childitem) {
      const num = this.domaninsAddForm.domanins[index].children.indexOf(childitem) // indexOf查找当前循环项的 索引
      this.domaninsAddForm.domanins[index].children.splice(num, 1) // splice方法 删除 索引处的多少数组元素
    },
    // 提交事件
    parmatSubmit() {
      this.$http
        .insertParItem({
          itemCatId: this.treeData.cid,
          // 注意!!! 对象类型的数据不能直接传递给后台，需要转换为字符串后传递
          paramData: JSON.stringify(this.domaninsAddForm.domanins),
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message({
              message: '参数添加成功',
              type: 'success',
            })
            this.dialogVisible = false
            this.dialogAddVisible = false
          }
          this.clearForm()
          // 传递事件，通知列表和页数更新
          this.$bus.$emit('refresh', true)
        })
    },
    // 封装 清空表单方法
    clearForm() {
      this.treeData = {}
      this.domaninsAddForm = {
        domanins: [
          {
            value: '',
            // 小分类
            children: [
              { childValue: '', value: '' },
              { childValue: '', value: '' },
            ],
          },
        ],
      }
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

<style lang="less" scoped></style>
