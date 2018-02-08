const config = require('../app/helper/config')

const db = {
    'development': {
        'host': '127.0.0.1',
        'username': 'root',
        'password': '123456',
        'database': 'test'
    },
    'production': {
        'host': '127.0.0.1',
        'username': 'root',
        'password': '123456',
        'database': 'test'
    }
}

module.exports = config(db)