// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express()
// 导入 cors 模块
const cors = require('cors')
// 导入 路由 模块
const router = require('./router.js')

// 配置解析 URL-encoded 格式的请求体数据
app.use(express.urlencoded({ extended: true }))
// 配置 cors 这个中间件，从而解决接口跨域的问题
app.use(cors())
// 配置 路由模块 注册到 app 上 
app.use('/api', router)
// 托管本地的 upload 文件夹, 使用 "接口/文件名" 就可以访问
app.use(express.static('upload'))

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000')
})