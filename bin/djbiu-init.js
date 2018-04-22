#!/usr/bin/env node

const skeleton = require('../lib/skeleton')

module.exports = (name, port) => {
    // 只要用port判断就可以，因为commander.options里面的name默认是一个函数
    // 只有在cli里面传入name，这个name才表示要生成的项目名称
    if (port) {
        const metadata = {
            projectName: name,
            port: port
        }
        skeleton(metadata)
        return
    }

    const inquirer = require('inquirer')
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
}