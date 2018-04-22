#!/usr/bin/env node

const program = require('commander')
const packageInfo = require('../package.json')

program
    .version(packageInfo.version)
    .usage("\n\t1. djbiu init -n '项目名称' -p '启动服务的端口号'\n\t2. djbiu crud -t '表名' -m '类名'")

program
    .command('init')
    .description('初始化新项目的脚手架')
    .option('-n, --name [value]', '项目名称')
    .option('-p, --port <n>', '启动服务的端口号，默认是3000')
    .action((options) => {
        require('./djbiu-init')(options.name, options.port)
    })
    .on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log("    $ djbiu init -n '项目名称' -p '启动服务的端口号'");
        console.log();
    })

program
    .command('crud')
    .description('自动生成model的增删改查')
    .option('-t, --table [value]', '对应的表名')
    .option('-m, --model [value]', '对应的类名')
    .action((options) => {
        require('./djbiu-crud')(options.table, options.model)
    })
    // .action((cmd, options) => {
    //     modelName = options.model
    //     tableName = options.table

    //     if (modelName && tableName) {
    //         const metadata = {
    //             modelName: modelName,
    //             tableName: tableName
    //         }
    //         const crud = require('../lib/crud')
    //         crud(metadata)
    //     }
    // })
    .on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log("    $ djbiu crud -t '表名' -m '类名'");
        console.log();
    })

program
    .parse(process.argv)
