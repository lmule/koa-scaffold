const fs = require('fs-extra')
const cloneGit = require('./cloneGit')

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