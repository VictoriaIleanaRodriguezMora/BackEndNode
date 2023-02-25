const express = require("express")
const RouterAuth = express.Router()
// COOKIES - SESSION - PASSPORT

const PORT = 5050
console.log(PORT);
/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/signup");
    }
}
const passport = require("passport")
// COOKIES - SESSION - PASSPORT
const functionsPassport = require("../Router/Passport/functions")



RouterAuth.get("/login", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/login` })
    next();
}, functionsPassport.GET_LoginRoot);

RouterAuth.post("/login", (req, res, next) => {
    logger.info({ POST: `http://localhost:${PORT}/login` })
    next();
},
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
    functionsPassport.POST_LoginRoot
);

RouterAuth.get("/faillogin", (req, res, next) => {
    logger = log4jsConfigure.getLogger("error")
    logger.error({ GET_FAIL: `http://localhost:${PORT}/faillogin` })
    next();
},
    functionsPassport.GET_FailLoginRoot);

RouterAuth.get("/signup", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/signup` })
    next();
},
    functionsPassport.GET_SignUp);

RouterAuth.post(
    "/signup",
    (req, res, next) => {
        logger.error({ POST_ERROR: `http://localhost:${PORT}/signup` })
        next();
    },
    passport.authenticate("signup", { failureRedirect: "/failsignup" }),
    functionsPassport.POST_SignUp
);

RouterAuth.get("/failsignup", (req, res, next) => {
    logger = log4jsConfigure.getLogger("error")
    logger.error({ GET_FAIL: `http://localhost:${PORT}/failsignup` })
    next();
},
    functionsPassport.GET_FailSignUp);

RouterAuth.get("/logout", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/logout` })
    next();
},
    functionsPassport.GET_LogOut);

RouterAuth.get("/ruta-protegida", checkAuthentication, (req, res) => {
    logger.info({ GET: `http://localhost:${PORT}/ruta-protegida` })
    const { username, password } = req.user;
    const user = { username, password };
    res.send(user);
});

RouterAuth.get("/profileuser", checkAuthentication, (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/profileuser` })
    next();
},
    functionsPassport.GET_ProfileUser);

RouterAuth.get("/carritos", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/carritos` })
    next();
},
    functionsPassport.GET_Carritos);

RouterAuth.post("/carritos", (req, res, next) => {
    logger.info({ POST: `http://localhost:${PORT}/carritos` })
    next();
},
    functionsPassport.POST_Carritos);






module.exports = RouterAuth
