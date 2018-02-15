#!/usr/bin/env node

const program = require('commander')
const build = require('../lib/build')

program
    .version('0.0.1')
    .usage('-n 项目名称 -p 启动服务的端口号')
    .option('-n, --name [value]', '项目名称')
    .option('-p, --port <n>', '启动服务的端口号，默认是3000')
    .command('init', '创建新项目')
    .command('crud', '自动生成model的增删改查')
    .parse(process.argv)

projectName = program.name
port = program.port

if (projectName && port) {
    const metadata = {
        projectName: projectName,
        port: port
    }
    build(metadata)
}