const log4js = require('log4js');

log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
      miLoggerFile: { type: 'file', filename: './LOGGER/info.log' },
      miLoggerFile2: { type: 'file', filename: './LOGGER/info2.log' }
    },
    categories: {
      default: { appenders: ["miLoggerConsole"], level: "trace" },
      // trace: { appenders: ["miLoggerConsole"], level: "trace" },
      debug: { appenders: ["miLoggerConsole"], level: "debug" },
      info: { appenders: ["miLoggerConsole", "miLoggerFile2"], level: "info" },
      warn: { appenders: ["miLoggerConsole","miLoggerFile"], level: "warn" },
      error: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "error" },
      fatal: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "fatal" }

    }
   })
    
  
   const logger = log4js.getLogger("error");
   logger.trace("Entering cheese testing");
   logger.debug("Got cheese.");
   logger.info("Cheese is Comté.");
   logger.warn("Cheese is quite smelly.");
   logger.error("Cheese is too ripe!");
   logger.fatal("Cheese was breeding ground for listeria.");



