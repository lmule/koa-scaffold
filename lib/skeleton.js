const initSkeleton = require('./initSkeleton')
const compileTemplate = require('./compileTemplate')
const logSymbols = require('log-symbols')
const chalk = require('chalk')

module.exports = function(metadata) {
    initSkeleton(metadata.projectName)
        .then(result => {
            return compileTemplate(metadata, metadata.projectName, metadata.projectName)
        })
        .then(result => {
        })
        .catch(err => {
            console.error(logSymbols.error, chalk.red(err.message))
        })
}