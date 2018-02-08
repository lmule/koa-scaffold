const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
let appenders = {
    console: { 
        type: 'console' 
    }
}
let categoryAppenders = ['console']

/*
    appenders: { 
        console: { 
            type: 'console' 
        },
        error: {
            type: 'dateFile',
            filename: 'aaaa-error',
            pattern: '.yyyy-MM-dd-hh',
        },
        errors: { type: 'logLevelFilter', appender: 'error', level: 'error', maxLevel: 'error' }
    }
*/
/*
    categories: { 
        default: { 
            appenders: [ 
                'console',
                'errors'
            ],
            level: 'trace' 
        } 
    }
*/
levels.forEach((value, index, arr) => {
    appenders[value] = {
        type: 'dateFile',
        alwaysIncludePattern: true,
        filename: './log/' + value + '/',
        pattern: 'yyyy-MM-dd-hh.log',
    }
    appenders[value + 's'] = { 
        type: 'logLevelFilter', 
        appender: value, 
        level: value, 
        maxLevel: value
    }
    categoryAppenders.push(value + 's')
})

module.exports = {
    config: {
        appenders: appenders,
        categories: {
            default: {
                appenders: categoryAppenders,
                level: 'trace'
            }
        },
        pm2: true,
        pm2InstanceVar: 'INSTANCE_ID'
    },
    levels: levels
}