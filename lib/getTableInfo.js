const mysql = require('mysql');
const util = require('util')
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
        connection.query(util.format('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = "%s" AND TABLE_NAME = "%s"', db.database, tableName) , (error, data, fields) => {
            if (error) {
                reject(error)
                return
            }
            resolve(data)
        });
    })

    let indices = new Promise((resolve, reject) => {
        connection.query(util.format('SHOW KEYS FROM %s WHERE Key_name = "PRIMARY"', tableName), (error, data, fields) => {
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
        name: tableName
    }
    return tableInfo
}
