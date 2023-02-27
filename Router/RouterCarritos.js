const express = require("express")
const RouterCarritos = express.Router()

const PORT = 5050

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

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

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/signup");
    }
}
module.exports = RouterCarritos
