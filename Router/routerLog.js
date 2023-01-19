function getRoot(req, res) {
  console.log("-------- MAIN ----------");
  res.render("./pages/indexLog.ejs");
}

function getLogin(req, res) {
  console.log(" -------- LOGIN -------- ");
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("./pages/profileUser", { user });
  } else {
    res.render("./pages/login");
  }
}

function getSignup(req, res) {
  console.log(" -------- SIGNUP -------- ");

  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("./pages/profileUser", { user });
  } else {
    res.render("./pages/signup");
  }
}

function postLogin(req, res) {
  console.log(" -------- POST LOGIN -------- ");

  const { username, password } = req.user;
  const user = { username, password };
  res.render("./pages/profileUser", { user });
}

function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("./pages/profileUser", { user });
}

function getFaillogin(req, res) {
  res.render("./pages/login-error", {});
}

function getFailsignup(req, res) {
  res.render("./pages/signup-error", {});
}

function getLogout(req, res) {

  res.render('pages/logout.ejs', { content: 'ya estas deslogueado: ' })

}

function failRoute(req, res) {
  res.status(404).render("./pages/routing-error", {});
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  failRoute,
};
