<template>
  <div class="headersecect">
    <el-form ref="selectFrom" :model="search" @submit.native.prevent>
      <el-input
        v-model.trim="search.content"
        placeholder="请输入内容"
        @keyup.native.enter="selectFrom"
      ></el-input>
      <el-button type="primary" @click="selectFrom">查询</el-button>
      <el-button type="primary" @click="dialogVisible">添加</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    IsSearch: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      search: {
        content: '',
      },
    }
  },
  methods: {
    // 查询按钮事件
    selectFrom() {
      // 判断搜索栏 是否有数据，才发起请求
      if (this.search.content) {
        // 发起 模糊查询 请求
        this.IsSearch({ search: this.search.content }).then(res => {
          if (res.data.status === 200) {
            // 将模糊查询的 结果 传递给列表组件
            this.$bus.$emit('searchData', res.data.results)
            // 将模糊查询的 数据条数 传递给分页组件
            this.$bus.$emit('DataPage', res.data.results.length)
          } else {
            // 没有数据 传递事件
            this.$bus.$emit('nullData')
          }
        })
      } else {
        this.$bus.$emit('http')
      }
    },
    // 点击添加按钮 传递事件
    dialogVisible() {
      this.$bus.$emit('dialog')
    },
  },
}
</script>

<style lang="less" scoped>
.headersecect {
  .el-form {
    display: flex;
    margin-bottom: 20px;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>
