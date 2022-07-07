<template>
  <div class="header-component">
    <i
      :class="{ 'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse }"
      @click="change"
    ></i>
    <h3>商城管理系统</h3>
    <div class="header-right">
      <i class="el-icon-user-solid">用户: {{ user.username }}</i>
      &nbsp;
      <el-button type="primary" size="medium" round @click="loginout">
        <i class="el-icon-switch-button">退出登录</i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MyHeader',
  props: ['isCollapse'],
  data() {
    return {
      icon: true,
      isicon: 'fold',
    }
  },
  computed: {
    // 从 vuex 动态获取 用户名
    ...mapState('login', ['user']),
  },
  methods: {
    change() {
      this.icon = !this.icon
      this.$emit('changeisCollapse')
    },
    // 退出登录后清除 vuex数据 和 本地的token
    ...mapMutations('login', ['setUser']),
    loginout() {
      this.setUser({})
      localStorage.removeItem('egotoken')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.header-component {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > i {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
