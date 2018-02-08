module.exports = app => {
    app.use(async (ctx, next) => {
        let data = await next()
        ctx.body = {
            'code': 0,
            'message': '',
            'data': data
        }
    })
}