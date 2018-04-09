const initCrud = require('./initCrud')
const compileTemplate = require('./compileTemplate')
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const getTableInfo = require('./getTableInfo')

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
            return compileTemplate(newMetadata, '.', '.')
        })
        .then(result => {
        })
        .catch(err => {
            console.error(logSymbols.error, chalk.red(err.message))
        })
}