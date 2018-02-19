#!/usr/bin/env node

const program = require('commander')
const skeleton = require('../lib/skeleton')
const crud = require('../lib/crud')

program
    .version('0.0.1')
    .usage('-n 项目名称 -p 启动服务的端口号')
    .option('-n, --name [value]', '项目名称')
    .option('-p, --port <n>', '启动服务的端口号，默认是3000')
    .option('-t, --table [value]', '对应的表名')
    .option('-m, --model [value]', '对应的类名')
    .command('init', '创建新项目')
    .command('crud', '自动生成model的增删改查')
    .parse(process.argv)

let projectName = program.name
let port = program.port

modelName = program.model
tableName = program.table

if (projectName && port) {
    const metadata = {
        projectName: projectName,
        port: port
    }
    skeleton(metadata)
}

if (modelName && tableName) {
    const metadata = {
        modelName: modelName,
        tableName: tableName
    }
    crud(metadata)
}