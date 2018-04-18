#!/usr/bin/env node

const program = require('commander')
const packageInfo = require('../package.json')

program
    .version(packageInfo.version)
    .usage("\n\t1. -n '项目名称' -p '启动服务的端口号'\n\t2. -t '表名' -m '类名'")

program
    .option('-n, --name [value]', '项目名称')
    .option('-p, --port <n>', '启动服务的端口号，默认是3000')
    .command('init', '创建新项目')
    .action(() => {
        let projectName = program.name
        let port = program.port

        if (projectName && port) {
            const metadata = {
                projectName: projectName,
                port: port
            }
            const skeleton = require('../lib/skeleton')
            skeleton(metadata)
        }
    })

program
    .option('-t, --table [value]', '对应的表名')
    .option('-m, --model [value]', '对应的类名')
    .command('crud', '自动生成model的增删改查')
    .action(() => {
        modelName = program.model
        tableName = program.table

        if (modelName && tableName) {
            const metadata = {
                modelName: modelName,
                tableName: tableName
            }
            const crud = require('../lib/crud')
            crud(metadata)
        }
    })

program
    .parse(process.argv)
