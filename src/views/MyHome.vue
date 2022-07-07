<template>
  <div class="home-components">
    <el-container>
      <!-- 侧边栏 -->
      <my-aside :isCollapse="isCollapse"></my-aside>
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <my-header @changeisCollapse="changeisCollapse" :isCollapse="isCollapse"></my-header>
        </el-header>
        <!-- 主体区域  -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyAside from '@/components/MyAside.vue'
import MyHeader from '@/components/MyHeader.vue'
export default {
  name: 'MyHome',
  data() {
    return {
      isCollapse: false,
    }
  },
  components: {
    MyAside,
    MyHeader,
  },
  methods: {
    changeisCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.home-components {
  width: 100%;
  height: 100%;
  display: flex;
  .el-header {
    background-color: #409eff;
  }
}
</style>
