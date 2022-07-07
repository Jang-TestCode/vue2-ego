// 导入 express 模块
const express = require('express')
// 创建 路由 对象
const router = express.Router()
// 导入 数据库
const sqlClient = require('./config')
// 导入用于生成 JWT字符串(token) 的包
const jwt = require('jsonwebtoken')
const url = require('url')
const fs = require('fs')
const multer = require('multer')

// 登录接口
router.post('/login', (req, res) => {
  // 1.获取客户端通过请求体，发送到服务器的 URL-encoded 数据，并结构赋值 操作数据库的数据
  const { username, password } = req.body
  const arr = [username, password]
  // 2.定义待执行的 SQL 语句，其中英文的 ? 表示 占位符
  const sqlStr = 'SELECT * FROM user WHERE username=? and password=?'
  // 3.直接将数据对象当作占位符的值
  sqlClient(sqlStr, arr, results => {
    if (results.length > 0) {
      // 5.调用 jwt.sign() 生成 JWT 字符串
      let token = jwt.sign({ id: results[0].id, username: results[0].username }, 'secretKey')
      // 4.成功，调用 res.send() 方法，把数据响应给客户端
      res.send({
        status: 200, // 成功的状态
        msg: '登录成功!', // 成功状态的描述消息
        username,
        token,
      })
    } else {
      res.send({
        status: 401, // 失败的状态
        msg: '登录失败!', // 失败状态的描述消息
      })
    }
  })
})

// 注册接口
router.post('/register', (req, res) => {
  const { username, password, email } = req.body
  const arr = [username, password, email]
  const sqlStr = 'INSERT INTO user VALUES (null, ?, ?, ?)'
  sqlClient(sqlStr, arr, results => {
    if (results.affectedRows === 1) {
      res.send({
        status: 200,
        msg: '注册成功!',
      })
    } else {
      res.send({
        status: 401,
        msg: '注册失败!',
      })
    }
  })
})

// 商品查询接口
// 由于后面联调 所以接口名称为
router.get('/backend/item/selectTbItemAllByPage', (req, res) => {
  const page = url.parse(req.url, true).query.page || 1
  // 限制 查询的数据的数量为 10，从 上一个分页 的 最后一个数据 开始提取数据(偏移)
  const sqlStr = 'SELECT * FROM project ORDER BY id DESC LIMIT 10 OFFSET ' + (page - 1) * 10
  sqlClient(sqlStr, null, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '获取列表成功!',
        results,
      })
    } else {
      res.send({
        status: 401,
        msg: '获取列表失败!',
      })
    }
  })
})

// 商品总条数接口
router.get('/total', (req, res) => {
  const sqlStr = 'SELECT COUNT(*) FROM project WHERE id'
  sqlClient(sqlStr, null, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '获取商品总条数成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无更多数据!',
      })
    }
  })
})

// 商品模糊查询
router.get('/search', (req, res) => {
  const search = url.parse(req.url, true).query.search
  const sqlStr =
    "SELECT * FROM project WHERE CONCAT(`title`,`sellPoint`,`descs`) LIKE '%" + search + "%'"
  sqlClient(sqlStr, null, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '模糊查询成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无更多数据!',
      })
    }
  })
})

// 商品类目选择的查询
router.get('/backend/itemTree/selectTbitemTreeAllById', (req, res) => {
  const id = url.parse(req.url, true).query.id || 1
  const sqlStr = 'SELECT * FROM category WHERE id=?'
  const arr = [id]
  sqlClient(sqlStr, arr, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '商品类目查询成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无更多数据!',
      })
    }
  })
})

// 上传图片的接口
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

const uploadFolder = './upload/'
createFolder(uploadFolder)
const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), function (req, res, next) {
  const file = req.file
  console.log('文件类型：%s', file.mimetype)
  console.log('原始文件名：%s', file.originalname)
  console.log('文件大小：%s', file.size)
  console.log('文件保存路径：%s', file.path)
  res.json({ res_code: '0', name: file.originalname, url: file.path })
})

// 商品添加接口
router.get('/backend/itemTree/insertTbItem', (req, res) => {
  const cid = url.parse(req.url, true).query.cid || ''
  const title = url.parse(req.url, true).query.title || ''
  const sellPoint = url.parse(req.url, true).query.sellPoint || ''
  const price = url.parse(req.url, true).query.price || ''
  const num = url.parse(req.url, true).query.num || ''
  const image = url.parse(req.url, true).query.image || ''
  const descs = url.parse(req.url, true).query.descs || ''
  const sqlStr = "INSERT INTO project VALUES (null,?,?,?,?,?,?,'',1,'','',?)"
  const arr = [title, image, sellPoint, price, cid, num, descs]
  sqlClient(sqlStr, arr, results => {
    if (results.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '商品添加成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '商品添加失败!',
      })
    }
  })
})

// 商品删除接口
router.get('/backend/item/deleteItemById', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const arr = [id]
  const sqlStr = 'DELETE FROM project WHERE id=?'
  sqlClient(sqlStr, arr, results => {
    if (results.affectedRows === 1) {
      res.send({
        status: 200,
        msg: '删除成功!',
      })
    } else {
      res.send({
        status: 500,
        msg: '删除失败!',
      })
    }
  })
})

// 预更新接口
router.get('/backend/item/proUpdateItem', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const sqlStr = 'SELECT * FROM project WHERE id=?'
  const arr = [id]
  sqlClient(sqlStr, arr, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '预更新成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '预更新失败!',
      })
    }
  })
})

// 类目选择的预更新接口
router.get('/proTreeUpdateItem', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const cid = url.parse(req.url, true).query.cid
  const sqlStr = 'SELECT * FROM category WHERE id=? and cid=?'
  const arr = [id, cid]
  sqlClient(sqlStr, arr, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '预更新成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '预更新失败!',
      })
    }
  })
})

// 编辑商品事件
router.get('/backend/item/updateTbItem', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const cid = url.parse(req.url, true).query.cid || ''
  const title = url.parse(req.url, true).query.title || ''
  const sellPoint = url.parse(req.url, true).query.sellPoint || ''
  const price = url.parse(req.url, true).query.price || ''
  const num = url.parse(req.url, true).query.num || ''
  const image = url.parse(req.url, true).query.image || ''
  const descs = url.parse(req.url, true).query.descs || ''
  const sqlStr =
    'UPDATE project SET title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=? where id=?'
  const arr = [title, sellPoint, cid, price, num, descs, image, id]
  sqlClient(sqlStr, arr, results => {
    if (results.affectedRows === 1) {
      res.send({
        status: 200,
        msg: '商品修改成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '商品修改失败!',
      })
    }
  })
})

// 规格参数查询
router.get('/backend/itemParam/selectItemParamAll', (req, res) => {
  const page = url.parse(req.url, true).query.page || 1
  const sqlStr = 'SELECT * FROM params ORDER BY id DESC LIMIT 10 OFFSET ' + (page - 1) * 10
  sqlClient(sqlStr, null, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '查询成功！',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据！',
      })
    }
  })
})

// 规格参数总条数接口
router.get('/ParameterTotal', (req, res) => {
  const sqlStr = 'SELECT COUNT(*) FROM params WHERE id'
  sqlClient(sqlStr, null, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '获取商品总条数成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无更多数据!',
      })
    }
  })
})

// 规格参数模糊查询
router.get('/Parametersearch', (req, res) => {
  const search = url.parse(req.url, true).query.search
  const sqlStr = "SELECT * FROM params WHERE CONCAT(`paramData`) LIKE '%" + search + "%'"
  sqlClient(sqlStr, null, results => {
    if (results.length > 0) {
      res.send({
        status: 200,
        msg: '模糊查询成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无更多数据!',
      })
    }
  })
})

// 规格参数添加接口
router.get('/backend/itemParameter/insertParItem', (req, res) => {
  const paramData = url.parse(req.url, true).query.paramData
  const itemCatId = url.parse(req.url, true).query.itemCatId
  const sqlStr = 'INSERT INTO params VALUES (null,?,?)'
  const arr = [itemCatId, paramData]
  sqlClient(sqlStr, arr, results => {
    if (results.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '规格参数添加成功!',
        results,
      })
    } else {
      res.send({
        status: 500,
        msg: '规格参数添加失败!',
      })
    }
  })
})

// 规格参数删除接口
router.get('/backend/itemParameter/deleteItemParamById', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const arr = [id]
  const sqlStr = 'DELETE FROM params WHERE id=?'
  sqlClient(sqlStr, arr, results => {
    if (results.affectedRows === 1) {
      res.send({
        status: 200,
        msg: '删除成功!',
      })
    } else {
      res.send({
        status: 500,
        msg: '删除失败!',
      })
    }
  })
})

// 向外暴露路由对象
module.exports = router
