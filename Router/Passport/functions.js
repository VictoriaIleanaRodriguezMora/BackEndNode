const ContainerMongo = require("../../DAOS/MainContainers/ContainerMongo.js")
const UsuarioSchemaApp = require("../../models/schemaUsuariosApp")
const MongoUsersInstance = new ContainerMongo(UsuarioSchemaApp)
// MongoUsersInstance.getById("63f0e3efc2d9419a95287f89")

/* LOG4JS */
const { log4jsConfigure } = require("../../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

function GET_MainRoot(req, res) {
  res.render("./pages/indexLog.ejs");
}

async function GET_LoginRoot(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;

    const userFindByUsername = await MongoUsersInstance.getByUsername(username)

    const { phone, adress, age, avatar } = userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar };
    // console.log("nnnnnnnnnnnnnnnnnnnnnnnnn", userFindByUsername[0].age)

    res.render("./pages/profileUser", { user });
    logger = log4jsConfigure.getLogger("warn")
    logger.warn("GET_LoginRoot", user)

  } else {
    res.render("./pages/login");
  }
}

function GET_SignUp(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const { phone, adress, age, avatar } = req.body
    const user = { username, password, phone, adress, age, avatar };
    res.render("./pages/profileUser", { user });
    logger = log4jsConfigure.getLogger("warn")
    logger.warn("GET_SignUp", user)
  } else {
    res.render("./pages/signup");
  }
}

function POST_LoginRoot(req, res) {
  const { username, password } = req.user;
  const { phone, adress, age, avatar } = req.body
  const user = { username, password, phone, adress, age, avatar };
  res.render("./pages/profileUser", { user });
  logger = log4jsConfigure.getLogger("warn")
  logger.warn("POST_LoginRoot", user)
}

function POST_SignUp(req, res) {
  const { username, password } = req.user;
  const { phone, adress, age, avatar } = req.body
  const user = { username, password, phone, adress, age, avatar };
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
};
