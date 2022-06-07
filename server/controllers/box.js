const boxModel = require('../models/boxModel.js')
class BoxController {
  // 获取
  static async boxData(ctx) {
    const data = ctx.request.body
    const { type, tags, hide } = data

    // 当type为空或者type的值为全部时,查询全部数据
    const typeFilter = !type || type === '全部' ? {} : { type }
    // 按标签筛选,当标签不存在或者标签为空数组时不做条件筛选
    const tagsFilter = !tags || tags.length === 0 ? {} : { tags: { $in: tags } }
    // 按是否隐藏来筛选
    const hideFilter = typeof hide === 'boolean' ? { hide } : {}

    const list = await boxModel.find({
      ...typeFilter,
      ...tagsFilter,
      ...hideFilter,
    })
    if (list !== null) {
      // 时间按照由近到远排序
      list.sort(function (a, b) {
        return a.time < b.time ? 1 : -1
      })
      return ctx.send(list)
    } else {
      return ctx.sendError('000002')
    }
  }

  // 通过id查询
  static async findById(ctx) {
    const { id } = ctx.query
    const data = await boxModel.findOne({ _id: id })
    if (data !== null) {
      return ctx.send(data)
    } else {
      return ctx.sendError('000002')
    }
  }

  // add
  static async addBox(ctx) {
    const data = ctx.request.body
    const checkBox = await boxModel.findOne({
      site: data.site,
    })
    if (checkBox !== null) {
      return ctx.sendError('000002', '该网站已存在')
    }
    const box = new boxModel(data)
    const result = await box.save()
    return result !== null
      ? ctx.send(null, 'add成功')
      : ctx.sendError('000002', 'add失败')
  }

  // 批量新增
  // ! Koa 返回值总是在异步代码执行完前就返回了
  // ! 批量新增时 更新时间字段 异常
  static async batchCreate(ctx) {
    const { data } = ctx.request.body

    const isUniqueSite = async data => {
      const result = await boxModel.findOne({
        site: data.site,
      })
      // return result === null ? data : null // true: 该site没有document
      return result
    }

    const uniqueData = []
    let counter = 1
    let result = null
    data.forEach(async item => {
      await isUniqueSite(item).then(res => {
        if (!res) {
          uniqueData.push(item)
        }
      })

      if (data.length === counter) {
        result = await boxModel.insertMany(uniqueData)
        console.log(result.length, ' will be add')

        // 返回体放在这个地方不会生效
        return result !== null
          ? ctx.send(null, {
              message: '操作成功',
              oklist: uniqueData,
            })
          : ctx.sendError('000002', '操作失败')
      }
      counter++
    })
  }

  // 删除
  static async delete(ctx) {
    const result = await boxModel.deleteOne({ _id: ctx.query.id })
    if (result !== null) {
      return ctx.send(true)
    } else {
      return ctx.sendError('000002')
    }
  }

  // 更新
  static async update(ctx) {
    const data = ctx.request.body
    const result = await boxModel.findOneAndUpdate({ _id: data._id }, data)
    return result !== null
      ? ctx.send(null, '更新成功')
      : ctx.sendError('000002', '操作失败')
  }
}

module.exports = BoxController
