const mongoose = require('mongoose')
const dbCloud = 'mongodb://47.96.156.194:27017/niu-box'
const dbVMare = 'mongodb://localhost:27017/niu-box'
mongoose.connect(dbCloud, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const db = mongoose.connection

db.on('connected', () => {
  console.log('mongo 连接成功')
})

db.on('error', err => {
  console.log('mongo 连接失败: ' + err)
})
module.exports = db
