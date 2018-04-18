#!/usr/bin/env node

const program = require('commander')

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

// 初始化框架
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

// 初始化框架的增删改查
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