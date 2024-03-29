// SERVICIOS
const {
    findByUsername__MongoService,
    SAVE_Chat__MongoService,

} = require("../SERVICIO/servicio.mongo")

const {
    LoginRoot__ProfileUser__PassportService,
    SignUp__ProfileUser__PassportService
} = require("../SERVICIO/PASSPORT/middleware.passport")

// SERVICIOS

// LOG4JS 
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
logger = log4jsConfigure.getLogger("warn")
// LOG4JS 


/*   FUNCTIONS   */
function GET_MainRoot(req, res) {
    res.render("./pages/indexLog.ejs");
}

function GET_Products(req, res) {
    res.redirect("/products/");
}

async function GET_LoginRoot(req, res) {

    if (req.isAuthenticated()) {
        logger.warn("GET_LoginRoot")
        return await findByUsername__MongoService(req, res)
    } else {
        return res.render("./pages/login");
    }

}

async function GET_SignUp(req, res) {
    if (req.isAuthenticated()) {
        logger.warn("GET_SignUp")
        return await findByUsername__MongoService(req, res)
    } else {
        res.render("./pages/signup");
    }
}

async function POST_LoginRoot(req, res) {
    logger.info("POST_LoginRoot")
    return await LoginRoot__ProfileUser__PassportService(req, res)
}

async function POST_SignUp(req, res) {
    logger.info("POST_SignUp")
    return await SignUp__ProfileUser__PassportService(req, res)
}

function GET_FailLoginRoot(req, res) {
    res.render("./pages/login-error", {});
}

function GET_FailSignUp(req, res) {
    res.render("./pages/signup-error", {});
}

function GET_LogOut(req, res) {
    res.render('pages/logout.ejs', { content: 'ya estas deslogueado: ' })
}

function GET_FailRoute(req, res) {
    res.status(404).render("./pages/routing-error", {});
}

async function GET_ProfileUser(req, res) {

    const user = await findByUsername__MongoService(req, res)
    logger.info(`GET_ProfileUser()`)
    return await user
}

function GET_Carritos(req, res) {
    res.render("pages/carritos")
    logger.info("GET_Carritos")
}

async function GET_Chat(req, res) {
    await res.render("pages/chat")
    logger.info("GET_Chat")

}

async function getSessionInfo(req, res) {
    const infoSession = (req.session)
    req.session.touch()
    return await infoSession
};

module.exports = {
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
    // POST_Carritos,
    GET_Chat,
    GET_Products,
    getSessionInfo
};
