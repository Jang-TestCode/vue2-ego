// 1.导入 数据库 模块
const mysql = require('mysql')
// 2.建立与 数据库 的连接关系
const db = mysql.createPool({
  host: '127.0.0.1',    // 数据库的 IP 地址
  user: 'root',         // 登录数据库的账号
  password: 'admin123', // 登录数据库的密码
  database: 'my_db_ego' // 指定要操作哪个数据库
})

// 封装 操作数据库 的函数
const sqlClient = (sql, arr, callback) => {
  db.query(sql, arr, (err, results) => {
    // 操作失败
    if (err) return console.log(err.message)
    // 操作成功
    callback(results)
  })
}

module.exports = sqlClient