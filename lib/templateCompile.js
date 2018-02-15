const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

module.exports = (metadata = {}, src, dest = '.') => {
    const spinner = ora(`正在编译项目模板`)
    spinner.start()
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(fileName => {
                    const t = files[fileName].contents.toString()
                    files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
                })
                done()
            }).build(err => {
                if (err) {
                    spinner.fail()
                    reject(err)
                    return
                }
                spinner.succeed()
                console.log(logSymbols.success, chalk.green('成功创建项目工程'))
                resolve(true)
            })
    })
}