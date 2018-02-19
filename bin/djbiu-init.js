#!/usr/bin/env node

const inquirer = require('inquirer')
const skeleton = require('../lib/skeleton')

inquirer.prompt([
    {
        name: 'projectName',
        message: '请输入项目名称'
    },
    {
        name: 'port',
        message: '请输入启动服务的端口号，默认是3000',
        default: 3000
    }
]).then(metadata => {
    skeleton(metadata)
})