<template>
  <div>
    <product-header :IsSearch="$http.search"></product-header>
    <product-list></product-list>
    <product-page :total="productTotal"></product-page>
    <product-add></product-add>
    <product-edit></product-edit>
  </div>
</template>

<script>
import ProductHeader from '@/components/MyHeaderSearch.vue'
import ProductList from './ProductList.vue'
import productPage from '@/components/MyPage.vue'
import ProductAdd from './ProductAdd.vue'
import ProductEdit from './ProductEdit.vue'

export default {
  name: 'MyProduct',
  data() {
    return {
      productTotal: 0,
    }
  },
  components: {
    ProductHeader,
    ProductList,
    productPage,
    ProductAdd,
    ProductEdit,
  },
  methods: {
    // 封装 发起商品总条数的请求
    http() {
      this.$http.total().then(res => {
        if (res.data.status === 200) {
          // 统计商品的条数
          this.productTotal = res.data.results[0]['COUNT(*)']
        }
      })
    },
  },
  mounted() {
    this.http()
    // 模糊查询后的页数
    this.$bus.$on('DataPage', datalength => {
      this.productTotal = datalength
    })
    // 没有数据将页数清零
    this.$bus.$on('nullData', () => {
      this.productTotal = 0
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
