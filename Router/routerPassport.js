/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

function GET_MainRoot(req, res) {
  console.log("-------- MAIN ----------");
  res.render("./pages/indexLog.ejs");
  logger.info({ GET: "/" })
}
function GET_LoginRoot(req, res) {
  console.log(" -------- LOGIN -------- ");
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("./pages/profileUser", { user });
  } else {
    res.render("./pages/login");
  }
}

function GET_SignUp(req, res) {
  console.log(" -------- SIGNUP -------- ");

  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("./pages/profileUser", { user });
  } else {
    res.render("./pages/signup");
  }
}

function POST_LoginRoot(req, res) {
  console.log(" -------- POST LOGIN -------- ");

  const { username, password } = req.user;
  const user = { username, password };
  res.render("./pages/profileUser", { user });
}

function POST_SignUp(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
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
