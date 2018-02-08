const conf = require('../../config/db')
const knex = require('knex')({
    client: 'mysql',
    debug: true,
    connection: {
        host     : conf.host,
        user     : conf.username,
        password : conf.password,
        database : conf.database,
        charset  : 'utf8'
    }
});
const db = require('bookshelf')(knex)

module.exports = db