const base = {
  // 指定请求的根路径
  baseURL: 'http://127.0.0.1:3000',
  login: '/api/login',
  register: '/api/register',
  selectTbItemAllByPage: '/api/backend/item/selectTbItemAllByPage', // 商品列表
  total: '/api/total', // 商品总条数
  search: '/api/search', // 模糊查询商品
  selectTbitemTreeAllById: '/api/backend/itemTree/selectTbitemTreeAllById', // 商品类目
  insertTbItem: '/api/backend/itemTree/insertTbItem', // 商品添加
  deleteItemById: '/api/backend/item/deleteItemById', // 商品删除
  proUpdateItem: '/api/backend/item/proUpdateItem', // 预更新
  proTreeUpdateItem: '/api/proTreeUpdateItem', // 预更新类目选择
  updateTbItem: '/api/backend/item/updateTbItem', // 商品修改
  selectItemParamAll: '/api/backend/itemParam/selectItemParamAll', // 规格参数查询
  ParameterTotal: '/api/ParameterTotal', // 规格参数总条数
  Parametersearch: '/api/Parametersearch', // 规格参数模糊查询
  insertParItem: '/api/backend/itemParameter/insertParItem', // 规格参数添加
  deleteItemParamById: '/api/backend/itemParameter/deleteItemParamById', // 规格参数删除
}

export default base
