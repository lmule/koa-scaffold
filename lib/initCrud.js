const fs = require('fs')
const cloneGit = require('./cloneGit')

module.exports = () => {
    return new Promise(async (resolve, reject) => {
        let result = await cloneGit('github.com:lmule/koa-crud', '.')
        resolve(result)
    })
}