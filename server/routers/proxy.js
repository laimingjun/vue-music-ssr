const Router = require('koa-router')

const proxyRouter = new Router()

proxyRouter.get('/api/*', async (ctx, next) => {
  console.log(ctx.path)
  await next
})

module.exports = proxyRouter