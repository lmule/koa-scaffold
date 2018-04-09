const Metalsmith = require('metalsmith')
// const Handlebars = require('handlebars')
const ejs = require('ejs')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const renamer = require('metalsmith-renamer')
// TODO: 妈蛋的，
// const ignore = require('metalsmith-ignore')

module.exports = (metadata = {}, src, dest = '.') => {
    const spinner = ora(`正在编译项目模板`)
    spinner.start()
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            // .use(ignore('node_modules/*'))
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(fileName => {
                    // TODO: 先用这种恶心的方式不处理node_modules中的文件，回头研究下插件机制，看看怎么处理delete之后，以后的处理就生效
                    if (fileName.indexOf('node_modules') === 0) {
                        return
                    }
                    const t = files[fileName].contents.toString()
                    files[fileName].contents = new Buffer(ejs.compile(t)(meta))
                })
                done()
            })
            .use(renamer({
                filesToRename: {
                    pattern: '**/*.js',
                    rename: function (name) {
                        return ejs.compile(name)(metadata)
                    }
                }
            }))
            // .use((files, metalsmith, done) => {
            //     const meta = metalsmith.metadata()
            //     Object.keys(files).forEach(fileName => {
            //         // TODO: 先用这种恶心的方式不处理node_modules中的文件，回头研究下插件机制，看看怎么处理delete之后，以后的处理就生效
            //         if (fileName.indexOf('node_modules') === 0) {
            //             return
            //         }
            //         const t = files[fileName].contents.toString()
            //         files[fileName].contents = new Buffer(ejs.compile(t)(meta))
            //     })
            //     done()
            // })
            .build(err => {
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