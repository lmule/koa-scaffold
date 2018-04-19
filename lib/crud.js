const initCrud = require('./initCrud')
const compileTemplate = require('./compileTemplateCrud')
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const getTableInfo = require('./getTableInfo')
const param = require('../config/param')
const fs = require('fs-extra')

module.exports = (metadata) => {
    initCrud()
        .then(() => {
            return getTableInfo(metadata.tableName)
        })
        .then(tableInfo => {
            let newMetadata = {
                table: {
                    columns: tableInfo.columns,
                    primaryKey: tableInfo.primaryKey,
                    name: metadata.tableName
                },
                ModelName: metadata.modelName,
                modelname: metadata.modelName.toLowerCase()
            }
            return compileTemplate(newMetadata, param.crud_temp_dir, param.crud_temp_dir)
        })
        // 将被替换的模板拷贝到app文件夹
        .then(result => {
            if (result !== true) {
                
            }
            fs.copySync(param.crud_temp_dir, '.', {
                filter: /^(?!.*<%)/
            })
        })
        // 删除临时文件夹
        .then(() => {
            fs.removeSync(param.crud_temp_dir)
        })
        .catch(err => {
            console.error(logSymbols.error, chalk.red(err.message))
        })
}