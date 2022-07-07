<template>
  <div class="aside-components">
    <el-menu
      router
      :default-active="$route.path"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 一级菜单栏 -->
      <el-menu-item v-for="(item, index) in asidelist" :key="index" :index="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.asideitem }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MyAside',
  props: ['isCollapse'],
  data() {
    return {
      asidelist: [
        { path: '/home', asideitem: '商品管理', icon: 'menu' },
        { path: '/home/parameter', asideitem: '规格参数', icon: 'setting' },
        {
          path: '/home/advertisement',
          asideitem: '广告分类',
          icon: 'document',
        },
        { path: '/home/main', asideitem: '个人中心', icon: 'location' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.aside-components {
  text-align: left;
  height: 100%;
  display: flex;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
