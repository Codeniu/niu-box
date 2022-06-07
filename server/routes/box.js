const router = require('koa-router')(),
  Box = require('../controllers/box.js')
router.post('/boxData', Box.boxData)
router.post('/addBox', Box.addBox)
router.get('/delete', Box.delete)
router.get('/find', Box.findById)
router.post('/update', Box.update)
router.post('/batchCreate', Box.batchCreate)
module.exports = router
