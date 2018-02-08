const Koa = require('koa')
const app = new Koa()
const middleware = require('./app/middleware')
middleware(app)

const defaultPort = require('./config/param').defaultPort

let port = process.env.PORT || defaultPort

process.on('uncaughtException', err => {
    console.error('Unexpected exception: ' + err)
})

app.listen(port, () => {
    console.log('server start done')
});
