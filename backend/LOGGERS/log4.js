const log4js = require('log4js')


const log4jsConfigure = log4js.configure({
    appenders: {
        console: { type: 'console' },
        errorsFile: { type: 'file', filename: './LOGGERS/error.log' },
        warningsFile: { type: 'file', filename: './LOGGERS/warn.log' },
        fatalsFile: { type: 'file', filename: './LOGGERS/fatal.log' }

    },
    categories: {
        default: { appenders: ['console'], level: 'trace' },
        consola: { appenders: ['console'], level: 'debug' },
        info: { appenders: ['console'], level: 'info' },
        warn: { appenders: ['console', 'warningsFile'], level: 'warn' },
        error: { appenders: ['console', 'errorsFile'], level: 'error' },
        fatal: { appenders: ['console', 'fatalsFile'], level: 'fatal' },
    }
})


module.exports = { log4jsConfigure }