const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

module.exports = (repo, dest) => {
    const spinner = ora(`正在下载项目模板，源地址：${repo}`)
    spinner.start()
    return new Promise((resolve, reject) => {
        download(repo, dest, err => {
            if (err) {
                spinner.fail()
                reject(err)
                return
            }
            spinner.succeed()
            console.log(logSymbols.success, chalk.green('成功下载项目模板'))
            resolve(true)
        })
    })
}