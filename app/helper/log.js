const log4js = require('log4js')
const logConfig = require('../../config/log')
log4js.configure(logConfig.config)

module.exports = log4js.getLogger()