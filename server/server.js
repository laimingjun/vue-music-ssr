/* eslint-disable no-console */
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const proxyRouter = require('./routers/proxy')
const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../public/') })
  } else {
    await next()
  }
})

const pageRouter = isDev ? require('./routers/dev-ssr') : require('./routers/ssr')

if (!isDev) {
  const staticRouter = require('./routers/static')
  app.use(staticRouter.routes())
}
app.use(proxyRouter.routes())
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server listen on ${HOST}:${PORT}`)
})
