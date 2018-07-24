const mysql = require('mysql')
const camelCase = require('camel-case')
const db = require(process.cwd() + '/config/db.js')

module.exports = async (tableName) => {
    const connection = mysql.createConnection({
        host: db.host,
        user: db.username,
        password: db.password,
        database: db.database
    });

    connection.connect();

    let columns = new Promise((resolve, reject) => {
        connection.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${db.database}' AND TABLE_NAME = '${tableName}'` , (error, data, fields) => {
            if (error) {
                reject(error)
                return
            }
            data.map((rowData) => {
                rowData['COLUMN_NAME'] = camelCase(rowData['COLUMN_NAME'])
            })
            resolve(data)
        });
    })

    let indices = new Promise((resolve, reject) => {
        connection.query(`SHOW KEYS FROM ${tableName} WHERE Key_name = "PRIMARY"`, (error, data, fields) => {
            if (error) {
                reject(error)
                return
            }
            resolve(data)
        });
    })
    connection.end();

    const results = await Promise.all([columns, indices])

    let columnNames = []
    results[0].forEach((element) => {
        columnNames.push(element['COLUMN_NAME'])
    })

    let primaryKey = ''
    if (results[1][0] && results[1][0]['Column_name']) {
        primaryKey = results[1][0]['Column_name']
    }

    let tableInfo = {
        columns: columnNames,
        primaryKey: primaryKey,
        camelCasedPrimaryKey: camelCase(primaryKey),
        name: tableName
    }
    return tableInfo
}
