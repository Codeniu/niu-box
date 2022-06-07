const mongoose = require('mongoose')
const dbCloud = 'mongodb://121.89.222.181:9011/test'
const dbVMare = 'mongodb://localhost:27017/test'
mongoose.connect(dbVMare, {
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
