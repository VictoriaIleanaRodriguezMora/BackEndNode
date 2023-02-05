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
        warn: { appenders: ["console", "errorsFile"], level: "warn" },

    }
})

/* let logger
function getLogger(logger, level) {
    logger = log4jsConfigure.getLogger(level)
    return logger
}
getLogger(logger, "info") */

/* logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria."); */

module.exports = { log4jsConfigure }