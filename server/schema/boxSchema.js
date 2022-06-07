const mongoose = require('mongoose')

const boxSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    cover: String,

    site: String,

    type: String, // 分类

    tags: Object, // 标签

    // 是否隐藏
    hide: {
      type: Boolean,
      default: false,
    },

    // createTime: {
    //   type: Date,
    //   default: Date.now,
    // },

    // updateTime: {
    //   type: Date,
    //   default: Date.now,
    // },
  },

  {
    // 自动化管理更新创建时间（入库时间是零时区时间）
    // timestamps: true,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  }
)

module.exports = boxSchema
