const cors = require('koa2-cors')

module.exports = app => {
    app.use(cors())
}