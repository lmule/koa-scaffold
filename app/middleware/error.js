
module.exports = app => {
    app.use(async (ctx, next) => {
        try {
            await next()
        }
        catch (err) {
            let retError
            // 如果返回多个异常（比如表单验证，一次返回多个验证错误），则以数组的形式返回给前端
            if (Array.isArray(err)) {
                retError = []
                err.forEach(element => {
                    retError.push(element)
                })
            }
            // 否则直接返回异常信息
            else {
                retError = err.message
            }
            ctx.status = 200
            ctx.body = {
                'code': -1,
                'message': retError,
                'data': ''
            }
            app.emit('error', retError, ctx)
        }
    })
    app.on('error', (errorMessage, ctx) => {
        ctx.error('在请求%s的过程中发生了异常%s', ctx.url, errorMessage);
    })
}