const dotenv = require('dotenv').config()

const express = require("express")
const Router__Auth = express.Router()
const PORT = process.env.PORT


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
const passport = require("passport")

// CONTROLLER FN
const {
    GET_MainRoot,
    GET_LoginRoot,
    GET_SignUp,
    POST_LoginRoot,
    POST_SignUp,
    GET_FailLoginRoot,
    GET_FailSignUp,
    GET_LogOut,
    GET_FailRoute,
    GET_ProfileUser,
    GET_Carritos,
    getSessionInfo

} = require("../CONTROLLER/controllerAuth")

// ROUTES

Router__Auth.get("/login", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/login` })
    next();
}, GET_LoginRoot);

Router__Auth.post("/login", (req, res, next) => {
    logger.info({ POST: `http://localhost:${PORT}/login` })
    next();
},
    passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
    POST_LoginRoot
);

Router__Auth.get("/faillogin", (req, res, next) => {
    logger = log4jsConfigure.getLogger("error")
    logger.error({ GET_FAIL: `http://localhost:${PORT}/auth/faillogin` })
    next();
},
    GET_FailLoginRoot
);

Router__Auth.get("/signup", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/signup` })
    next();
},
    GET_SignUp
);

Router__Auth.post(
    "/signup",
    (req, res, next) => {
        logger.error({ POST_ERROR: `http://localhost:${PORT}/signup` })
        next();
    },
    passport.authenticate("signup", { failureRedirect: "/auth/failsignup" }),
    POST_SignUp
);

Router__Auth.get("/failsignup", (req, res, next) => {
    logger = log4jsConfigure.getLogger("error")
    logger.error({ GET_FAIL: `http://localhost:${PORT}/auth/failsignup` })
    next();
},
    GET_FailSignUp
);

Router__Auth.get("/logout", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/auth/logout` })
    next();
},
    GET_LogOut
);

Router__Auth.get("/ruta-protegida", checkAuthentication, (req, res) => {
    logger.info({ GET: `http://localhost:${PORT}/auth/ruta-protegida` })
    const { username, password } = req.user;
    const user = { username, password };
    res.send(user);
});

Router__Auth.get("/profileuser", checkAuthentication, async (req, res, next) => {
    const user = await GET_ProfileUser(req, res)
    logger.info({ GET: `http://localhost:${PORT}/auth/profileuser` })
    return await res.json(user)
});

Router__Auth.get("/info-session", checkAuthentication, async (req, res, next) => {
    const infoSession = await getSessionInfo(req, res)
    return await res.json(infoSession)
});


module.exports = Router__Auth