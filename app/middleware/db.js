const db = require('../helper/db')

module.exports = app => {
    app.context.db = db
}