const logger = require('./log')

module.exports = config => {
    const env = process.env.NODE_ENV
    const _config = config[env]
    if (!_config) {
        logger.fatal(`config:%O中不包含env:%s的配置`, config, env)
        throw new Error(JSON.stringify(config) + '中不包含env:' + env + '的配置')
    }
    return _config
}