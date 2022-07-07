<template>
  <div class="page">
    <el-pagination
      layout="total,prev, pager, next,jumper"
      :total="total"
      @current-change="currchange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: [Number, String],
      default: 0,
    },
  },
  methods: {
    // 当前页 发生变化
    currchange(val) {
      this.$bus.$emit('page', val)
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  margin-top: 20px;
}
</style>
