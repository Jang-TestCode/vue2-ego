import store from '@/store/index.js'
// 刷新本地的存储
if (localStorage.getItem('egotoken')) {
  store.commit('login/setUser', JSON.parse(localStorage.getItem('egotoken')))
}
