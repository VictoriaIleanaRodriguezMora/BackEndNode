const log4js = require("log4js")


log4js.configure({
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

let logger
function getLogger(level, toPutInLogger) {
    logger = log4js.getLogger(level)
    return logger
}
// getLogger("info")

/* logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria."); */

module.exports = { logger, getLogger }