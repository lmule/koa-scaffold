const initSkeleton = require('./initSkeleton')
const compileTemplate = require('./compileTemplate')
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const cmd = require('node-cmd')
const ora = require('ora')

module.exports = function(metadata) {
    initSkeleton(metadata.projectName)
        .then(result => {
            return compileTemplate(metadata, metadata.projectName, metadata.projectName)
        })
        .then(result => {
            const spinner = ora('正在安装所需npm包')
            spinner.start()

            return new Promise((resolve, reject) => {
                cmd.get(`
                    cd ${metadata.projectName};
                    npm install;
                `, (err, data, stderr) => {
                    if (err) {
                        spinner.fail()
                        reject(err)
                        return
                    }
                    spinner.succeed()
                    console.log(logSymbols.success, chalk.green('成功安装所需npm包'))
                    resolve(true)
                })
            })
        })
        .then(result => {
            console.log(`请修改 ${metadata.projectName}/config/db.js 中的数据库配置`)
            console.log("请执行 `djbiu crud -t '表名' -m '类名's'` 来生成对应的增删改查")
        })
        .catch(err => {
            console.error(logSymbols.error, chalk.red(err.message))
        })
}