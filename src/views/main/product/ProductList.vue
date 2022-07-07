<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column show-overflow-tooltip prop="id" label="商品ID" width="100"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="商品名称"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="image"
        label="商品图片"
        width="150"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="price"
        label="商品价格"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="num"
        label="商品数量"
        width="80"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="descs" label="商品描述">
        <!-- 用插槽的形式解析描述里的 HTML 标签 -->
        <template v-slot="scope">
          <div v-html="scope.row.descs"></div>
        </template>
      </el-table-column>
      <el-table-column width="145" label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    // 默认请求 第一页 数据
    this.http(1)
    // 当前页 加载点击页数 数据
    this.$bus.$on('page', page => {
      this.http(page)
    })
    // 模糊查询的后 重新渲染列表
    this.$bus.$on('searchData', search => {
      this.tableData = search
    })
    // 没有数据将列表清空
    this.$bus.$on('nullData', () => {
      this.tableData = []
    })
    // 输入框清空 加载第一页数据
    this.$bus.$on('http', () => {
      this.http(1)
    })
    // 商品添加成功后 加载第一页数据
    this.$bus.$on('refresh', flag => {
      this.http(1)
    })
  },
  methods: {
    // 封装 请求获取列表数据
    http(page) {
      this.$http.selectTbItemAllByPage({ page }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.results
        }
      })
    },
    // 编辑按钮事件
    handleEdit(index, row) {
      this.$bus.$emit('dialogEdit', row)
    },
    // 删除按钮事件
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        // 确定删除
        .then(() => {
          this.$http.deleteItemById({ id: row.id }).then(res => {
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              // 删除成功后更新列表和页数
              this.http(1)
              this.$bus.$emit('deleteList', true)
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败!',
              })
            }
          })
        })
        // 取消删除
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
