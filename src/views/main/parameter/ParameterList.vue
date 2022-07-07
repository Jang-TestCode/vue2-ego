<template>
  <div class="parameterlist">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="id"
        label="规格参数ID"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="itemCatId"
        label="产品关联ID"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="paramData"
        label="规格参数内容"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column width="80" label="操作">
        <template v-slot="scope">
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
    this.$bus.$on('page', data => {
      this.http(data)
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
      this.$http.selectItemParamAll({ page }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.results
          // console.log(this.tableData)
        }
      })
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
          this.$http.deleteItemParamById({ id: row.id }).then(res => {
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
