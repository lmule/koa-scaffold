const initFile = require('./initFile')
const templateCompile = require('./templateCompile')


module.exports = function(metadata) {
    initFile(metadata.projectName)
    .then(result => {
        return templateCompile(metadata, metadata.projectName, './build')
    })
    .then(result => {
    })
    .catch(err => {
        console.error(logSymbols.error, chalk.red(err.message))
    })
}