const json = require('koa-json')

module.exports = app => {
    app.use(json())
}