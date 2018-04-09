#!/usr/bin/env node

const inquirer = require('inquirer')
const crud = require('../lib/crud')

inquirer.prompt([
    {
        name: 'tableName',
        message: '请输入对应的表名'
    },
    {
        name: 'modelName',
        message: '请输入对应的类名'
    }
]).then(metadata => {
    crud(metadata)
})