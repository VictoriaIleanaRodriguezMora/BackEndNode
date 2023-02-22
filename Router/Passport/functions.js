const ContainerMongo = require("../../DAOS/MainContainers/ContainerMongo.js")

// UsuarioSchemaApp
const UsuarioSchemaApp = require("../../models/schemaUsuariosApp")
const MongoUsersInstance = new ContainerMongo(UsuarioSchemaApp)
// UsuarioSchemaApp

// CarritosSchema
const CarritosSchema = require("../../models/schemaCarritos")
const MongoCarritosInstance = new ContainerMongo(CarritosSchema)
// CarritosSchema


// Nodemailer
const { sendEmailNodeMailer } = require("../../Comunications_Services/nodemailer-ethereal")
// Nodemailer

// TWILIO
const { twilioo } = require("../../Comunications_Services/twilio")
// TWILIO

/* LOG4JS */
const { log4jsConfigure } = require("../../LOGGERS/log4")
const { info } = require("console")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */




/*   FUNCTIONS   */
function GET_MainRoot(req, res) {
  res.render("./pages/indexLog.ejs");
}

async function GET_LoginRoot(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;

    const userFindByUsername = await MongoUsersInstance.getByUsername(username)

    const { phone, adress, age, avatar, gmail } = userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar, gmail };

    res.render("./pages/profileUser", { user });
    logger = log4jsConfigure.getLogger("warn")
    logger.warn("GET_LoginRoot", user)

  } else {
    res.render("./pages/login");
  }
}

async function GET_SignUp(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;

    const userFindByUsername = await MongoUsersInstance.getByUsername(username)

    const { phone, adress, age, avatar, gmail } = userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar, gmail };

    res.render("./pages/profileUser", { user });
    logger = log4jsConfigure.getLogger("warn")
    logger.warn("GET_SignUp", user)
  } else {
    res.render("./pages/signup");
  }
}

function POST_LoginRoot(req, res) {
  const { username, password } = req.user;
  const { phone, adress, age, avatar, gmail } = req.body
  const user = { username, password, phone, adress, age, avatar, gmail };
  res.render("./pages/profileUser", { user });
  logger = log4jsConfigure.getLogger("warn")
  logger.info("POST_LoginRoot", user)
}

function POST_SignUp(req, res) {
  const { username, password } = req.user;
  const { phone, adress, age, avatar, gmail } = req.body
  const user = { username, password, phone, adress, age, avatar, gmail };
  MongoUsersInstance.saveUser(user)
  res.render("./pages/profileUser", { user });
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

function GET_ProfileUser(req, res) {
  const { username, password } = req.user;
  const { phone, adress, age, avatar, gmail } = req.body
  const user = { username, password, phone, adress, age, avatar, gmail };
  MongoUsersInstance.saveUser(user)
  res.render('pages/profileUser', { user })

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
  await twilioo(infoToGmail.msg, phone)
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
