const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger');
const session = require('koa-generic-session');
const koaRedis = require('koa-redis');
const { sessionInfo, cookieInfo, redisInfo, corsOrigin } = require('./config/config');
const cors = require('koa2-cors');

const crawlerRouter = require('./routes/crawler');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.keys = sessionInfo.keys; // 加密 cookie 的 key

app.use(cors({
  origin: function (ctx) {
    return corsOrigin;
  },
  credentials: true
}))

app.use(session({
  key: sessionInfo.name,   // cookie name
  prefix: sessionInfo.prefix, // redis key 前缀
  cookie: cookieInfo,
  store: koaRedis(redisInfo)
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(crawlerRouter.routes(), crawlerRouter.allowedMethods())
app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(adminRouter.routes(), adminRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
