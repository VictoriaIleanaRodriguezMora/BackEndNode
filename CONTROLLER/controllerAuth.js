// SERVICIOS
const { findByUsername__MongoService } = require("../SERVICIO/servicioMongo")

const {
    LoginRoot__ProfileUser__PassportService,
    SignUp__ProfileUser__PassportService
} = require("../SERVICIO/servicioPassport")

// SERVICIOS

// Nodemailer
const { sendEmailNodeMailer } = require("../SERVICIO/servicioNodeMailer")
// Nodemailer

// TWILIO
const { twilioSMS, twilioWPP } = require("../SERVICIO/servicioNodeMailer")
// TWILIO

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
logger = log4jsConfigure.getLogger("warn")
/* LOG4JS */


/*   FUNCTIONS   */
function GET_MainRoot(req, res) {
    res.render("./pages/indexLog.ejs");
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
    res.render('pages/profileUser', { user })
    logger.info(`GET_ProfileUser()`)

}

function GET_Carritos(req, res) {
    res.render("pages/carritos")
    logger.info("GET_Carritos")
}

async function POST_Carritos(req, res) {

    const { description, photo, price, name, title } = req.body
    const toSave = { title, products: { description, photo, price, name } }
    MongoCarritosInstance.saveCart(toSave)


    // nodemailer
    const { username } = req.user;
    const userFindByUsername = await MongoUsersInstance.getByUsername(username)
    const { phone, adress, age, avatar, gmail } = userFindByUsername[0]
    const infoToGmail = {
        subject: `Nuevo pedido de Usuario: ${username} Gmail: ${gmail}`,
        toSendEmail: gmail,
        emailToSend: gmail,
        msg: `Hola, ${username}! Usd se registró con el mail: ${gmail}. Y ha realizado esta orden: ${toSave.title}, ${toSave.products.description}, ${toSave.products.photo}, ${toSave.products.price}, ${toSave.products.name}. Saludos!`,
        tituloOrden: toSave.title,
    }

    await sendEmailNodeMailer(infoToGmail.toSendEmail, infoToGmail.subject, infoToGmail.msg)

    // nodemailer
    // TWILIO
    /*     await twilioSMS(infoToGmail.msg, phone)
        await twilioWPP(infoToGmail.msg) */
    // TWILIO



    res.render("pages/carritosPost", { carrito: toSave })
    logger.info("POST_Carritos")
}

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
    POST_Carritos
};
