const fs = require('fs')
const cloneGit = require('./cloneGit')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

module.exports = (projectName) => {
    return new Promise(async (resolve, reject) => {
        const isDir = fs.existsSync(projectName)
        if (isDir) {
            reject(new Error(`已经存在文件夹${projectName}，请更换一个吧`))
            return
        }
        let result = await cloneGit('github.com:lmule/koa-template', projectName)
        resolve(result)
    })
}