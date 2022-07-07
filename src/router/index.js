import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/views/MyLogin.vue'
import MyHome from '@/views/MyHome.vue'
import MyMain from '@/views/main/MyUser.vue'
import MyProduct from '@/views/main/product/index.vue'
import MyParameter from '@/views/main/parameter/index.vue'
import MyAdvertisement from '@/views/main/MyAdvertisement.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: MyLogin,
  },
  {
    path: '/home',
    component: MyHome,
    children: [
      {
        path: '',
        name: 'Product',
        component: MyProduct,
        meta: {
          isLogin: true,
        },
      },
      {
        path: 'main',
        name: 'Main',
        component: MyMain,
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: MyParameter,
      },
      {
        path: 'advertisement',
        name: 'Advertisement',
        component: MyAdvertisement,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    // 需要判断是否有token, 才能访问后台主页，
    let token = store.state.login.user.token
    if (token) {
      next()
    } else {
      // 没有token访问后台主页，强制跳转到登录
      next({ name: 'Login' })
      alert('请登录后进入后台页！')
    }
  } else {
    next()
  }
})

export default router
