const mongoose = require('mongoose'),
  boxSchema = require('../schema/boxSchema.js')

module.exports = mongoose.model('box', boxSchema)
