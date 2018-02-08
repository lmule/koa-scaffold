const log = require('../helper/log')
const levels = require('../../config/log').levels

module.exports = app => {
    levels.forEach((level) => {
        Object.defineProperty(app.context, level, {
            value: log[level].bind(log)
        })
    })

    app.use(async (ctx, next) => {
        const start = (new Date()).getTime()
        await next()
        const duration = (new Date()).getTime() - start
        ctx.info('请求:%s 共耗时%s毫秒', ctx.url, duration) 
    })
}