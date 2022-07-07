<template>
  <div>
    <el-tree :load="loadNode" :props="defaultProps" @node-click="handleNodeClick" lazy></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    }
  },
  methods: {
    handleNodeClick(data) {
      // 将选择的类目 传递给 添加商品组件
      this.$emit('onTree', data)
    },
    loadNode(node, resolve) {
      // 第一层的数据
      if (node.level === 0) {
        this.$http.selectTbitemTreeAllById().then(res => {
          if (res.data.status === 200) {
            return resolve(res.data.results)
          } else {
            return resolve([])
          }
        })
      }
      // 后续展开的数据
      if (node.level >= 1) {
        this.$http
          .selectTbitemTreeAllById({ id: node.data.cid })
          .then(res => {
            if (res.data.status === 200) {
              return resolve(res.data.results)
            } else {
              return resolve([])
            }
          })
          .catch(err => {
            resolve([])
          })
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
