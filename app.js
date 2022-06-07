const koa = require('koa'),
  app = new koa(),
  router = require('koa-router')(),
  json = require('koa-json'),
  koajwt = require('koa-jwt'),
  serve = require('koa-static'),
  bodyparser = require('koa-bodyparser'),
  logger = require('koa-logger')

const db = require('./server/config/db.js'),
  errorHandle = require('./server/middlewares/errorHandle.js'),
  sendHandle = require('./server/middlewares/sendHandle.js')

const user = require('./server/routes/user.js')
const box = require('./server/routes/box.js')

app.use(serve('./dist'))
app.use(json())
app.use(bodyparser({ useNewUrlParser: true }))
app.use(sendHandle())
app.use(errorHandle)
app.use(logger())
app.use(
  koajwt({
    secret: 'my_token',
  }).unless({
    path: [/\/api\/user\/register/, /\/api\/user\/login/, /\/api\/box\/*/],
  })
)

router.use('/api/user', user.routes())
router.use('/api/box', box.routes())
app.use(router.routes())

app.listen('3000', () => {
  console.log('koa is listening in 3000')
})
