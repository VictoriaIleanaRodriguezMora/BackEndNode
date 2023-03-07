const express = require("express")
const RouterAuth = express.Router()
// COOKIES - SESSION - PASSPORT

const PORT = 5050

/* LOG4JS */
const { log4jsConfigure } = require("../SERVICE/LOGGERS/log4")
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
    POST_Carritos
} = require("../CONTROLLER/controllerAuth")



RouterAuth.get("/login", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/login` })
    next();
}, GET_LoginRoot);

RouterAuth.post("/login", (req, res, next) => {
    logger.info({ POST: `http://localhost:${PORT}/login` })
    next();
},
    passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
    POST_LoginRoot
);

RouterAuth.get("/faillogin", (req, res, next) => {
    logger = log4jsConfigure.getLogger("error")
    logger.error({ GET_FAIL: `http://localhost:${PORT}/auth/faillogin` })
    next();
},
    GET_FailLoginRoot
);

RouterAuth.get("/signup", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/signup` })
    next();
},
    GET_SignUp
);

RouterAuth.post(
    "/signup",
    (req, res, next) => {
        logger.error({ POST_ERROR: `http://localhost:${PORT}/signup` })
        next();
    },
    passport.authenticate("signup", { failureRedirect: "/auth/failsignup" }),
    POST_SignUp
);

RouterAuth.get("/failsignup", (req, res, next) => {
    logger = log4jsConfigure.getLogger("error")
    logger.error({ GET_FAIL: `http://localhost:${PORT}/auth/failsignup` })
    next();
},
    GET_FailSignUp
);

RouterAuth.get("/logout", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/auth/logout` })
    next();
},
    GET_LogOut
);

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
    GET_ProfileUser
);

RouterAuth.get("/carritos", (req, res, next) => {
    logger.info({ GET: `http://localhost:${PORT}/carritos` })
    next();
},
    GET_Carritos
);

RouterAuth.post("/carritos", (req, res, next) => {
    logger.info({ POST: `http://localhost:${PORT}/carritos` })
    next();
},
    POST_Carritos
);




module.exports = RouterAuth
