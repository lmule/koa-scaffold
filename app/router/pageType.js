const router = require('koa-router')()
const controller = require('../controller/pageType')

router.prefix('/pagetype');

router.get('/', controller.list)

router.get('/add', controller.add)

module.exports = router