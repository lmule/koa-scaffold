const cloneGit = require('./cloneGit')
const param = require('../config/param')

module.exports = () => {
    return new Promise(async (resolve, reject) => {
        let result = await cloneGit('github.com:lmule/koa-crud', param.crud_temp_dir)
        resolve(result)
    })
}