import axios from '@/utils/request'
import base from './base.js'

const api = {
  // 登录
  login(params) {
    return axios.post(base.baseURL + base.login, params)
  },
  // 注册
  register(params) {
    return axios.post(base.baseURL + base.register, params)
  },
  // 商品列表
  selectTbItemAllByPage(params) {
    return axios.get(base.baseURL + base.selectTbItemAllByPage, { params })
  },
  // 商品总条数
  total() {
    return axios.get(base.baseURL + base.total)
  },
  // 模糊查询商品
  search(params) {
    return axios.get(base.baseURL + base.search, { params })
  },
  // 商品类目查询
  selectTbitemTreeAllById(params) {
    return axios.get(base.baseURL + base.selectTbitemTreeAllById, { params })
  },
  // 商品添加
  insertTbItem(params) {
    return axios.get(base.baseURL + base.insertTbItem, { params })
  },
  // 商品删除
  deleteItemById(params) {
    return axios.get(base.baseURL + base.deleteItemById, { params })
  },
  // 预更新
  proUpdateItem(params) {
    return axios.get(base.baseURL + base.proUpdateItem, { params })
  },
  // 预更新类目选择
  proTreeUpdateItem(params) {
    return axios.get(base.baseURL + base.proTreeUpdateItem, { params })
  },
  // 商品修改
  updateTbItem(params) {
    return axios.get(base.baseURL + base.updateTbItem, { params })
  },
  // 规格参数查询
  selectItemParamAll(params) {
    return axios.get(base.baseURL + base.selectItemParamAll, { params })
  },
  // 规格参数总条数
  ParameterTotal(params) {
    return axios.get(base.baseURL + base.ParameterTotal, { params })
  },
  // 规格参数模糊查询
  Parametersearch(params) {
    return axios.get(base.baseURL + base.Parametersearch, { params })
  },
  // 规格参数添加
  insertParItem(params) {
    return axios.get(base.baseURL + base.insertParItem, { params })
  },
  // 规格参数删除
  deleteItemParamById(params) {
    return axios.get(base.baseURL + base.deleteItemParamById, { params })
  },
}

export default api
