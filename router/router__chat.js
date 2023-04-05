const dotenv = require('dotenv').config()
const express = require("express")
const Router__Chat = express.Router()
const PORT = process.env.PORT
const passport = require("passport")

// LOG4JS 
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/signup");
    }
}

// CONTROLLER FN
const {
    GET_Chat,
} = require("../CONTROLLER/controllerAuth")

// ROUTES

Router__Chat.get("/", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/chat` })
    next();
},
    GET_Chat
);


module.exports = Router__Chat