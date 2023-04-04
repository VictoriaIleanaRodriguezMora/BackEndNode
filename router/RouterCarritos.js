const express = require("express")
const RouterCarritos = express.Router()

const PORT = process.env.PORT

// LOG4JS 
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

const {

    GET_Carritos,
    POST_Carritos
} = require("../CONTROLLER/controllerAuth")

RouterCarritos.get("/", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/carritos` })
    next();
},
    GET_Carritos
);

RouterCarritos.post("/", (req, res, next) => {
    logger.info({ POST: `http://localhost:${PORT}/carritos` })
    next();
},
    POST_Carritos
);


module.exports = RouterCarritos
