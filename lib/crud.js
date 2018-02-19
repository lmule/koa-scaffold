const initCrud = require('./initCrud')
const compileTemplate = require('./compileTemplate')
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const getTableInfo = require('./getTableInfo')

module.exports = (tableName, modelName) => {
    initCrud()
        .then(() => {
            return getTableInfo(tableName)
        })
        .then(tableInfo => {
            let metadata = {
                table: {
                    columns: tableInfo.columns,
                    primaryKey: tableInfo.primaryKey,
                    name: tableName
                },
                ModelName: modelName,
                modelname: modelName.toLowerCase()
            }
            return compileTemplate(metadata, '.', '.')
        })
        .then(result => {
        })
        .catch(err => {
            console.error(logSymbols.error, chalk.red(err.message))
        })
}