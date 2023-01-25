const express = require('express')
const app = express()
const routerPassport = express.Router()
const functionsPassport = require("./functions.js")
const passport = require("passport")
const { checkAuthentication } = require("../../PASSPORT/passport.js")


app.get("/", functionsPassport.getRoot);
routerPassport.get("/login", functionsPassport.getLogin);
routerPassport.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
    functionsPassport.postLogin
);
routerPassport.get("/faillogin", functionsPassport.getFaillogin);
routerPassport.get("/signup", functionsPassport.getSignup);
routerPassport.post(
    "/signup",
    passport.authenticate("signup", { failureRedirect: "/failsignup" }),
    functionsPassport.postSignup
);
routerPassport.get("/failsignup", functionsPassport.getFailsignup);
routerPassport.get("/logout", functionsPassport.getLogout);

routerPassport.get("/ruta-protegida", checkAuthentication, (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.send("<h1>Ruta ok!</h1>");
});
module.exports = routerPassport