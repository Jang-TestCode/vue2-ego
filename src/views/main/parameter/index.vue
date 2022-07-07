<template>
  <div class="parameter">
    <parameter-header :IsSearch="$http.Parametersearch"></parameter-header>
    <parameter-list></parameter-list>
    <parameter-page :total="parameterTotal"></parameter-page>
    <parameter-add></parameter-add>
  </div>
</template>

<script>
import ParameterHeader from '@/components/MyHeaderSearch.vue'
import ParameterList from './ParameterList.vue'
import ParameterPage from '@/components/MyPage.vue'
import ParameterAdd from './ParameterAdd.vue'

export default {
  name: 'MyParameter',
  data() {
    return {
      parameterTotal: 0,
    }
  },
  components: {
    ParameterList,
    ParameterPage,
    ParameterHeader,
    ParameterAdd,
  },
  methods: {
    // 封装 发起商品总条数的请求
    http() {
      this.$http.ParameterTotal().then(res => {
        if (res.data.status === 200) {
          // 统计商品的条数
          this.parameterTotal = res.data.results[0]['COUNT(*)']
        }
      })
    },
  },
  mounted() {
    this.http()
    // 模糊查询后的页数
    this.$bus.$on('DataPage', datalength => {
      this.parameterTotal = datalength
    })
    // 没有数据将页数清零
    this.$bus.$on('nullData', () => {
      this.parameterTotal = 0
    })
    // 输入框清空 加载第一次的商品总条数
    this.$bus.$on('http', () => {
      this.http()
    })
    // 商品添加成功后 加载第一次的商品总条数
    this.$bus.$on('refresh', flag => {
      this.http()
    })
    // 商品添加删除后 加载第一次的商品总条数
    this.$bus.$on('deleteList', flag => {
      this.http()
    })
  },
}
</script>

<style lang="less" scoped></style>
