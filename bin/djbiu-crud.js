const crud = require('../lib/crud')

module.exports = (tableName, modelName) => {
    if (tableName && modelName) {
        const metadata = {
            tableName: tableName,
            modelName: modelName
        }
        crud(metadata)
        return
    }

    const inquirer = require('inquirer')
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
}
