const helmet = require('koa-helmet')

module.exports = app => {
    app.use(helmet())
}