const log4js = require("log4js")


const log4jsConfigure = log4js.configure({
    appenders: {
        console: { type: "console" },
        warningsFile: { type: "file", filename: "./LOGGERS/warn.log" },
        errorsFile: { type: "file", filename: "./LOGGERS/error.log" }
    },
    categories: {
        default: { appenders: ["console"], level: "trace" },
        consola: { appenders: ["console"], level: "debug" },
        info: { appenders: ["console"], level: "info" },
        warn: { appenders: ["console", "warningsFile"], level: "warn" },
        fatal: { appenders: ["console", "errorsFile"], level: "fatal" },

    }
})


module.exports = { log4jsConfigure }