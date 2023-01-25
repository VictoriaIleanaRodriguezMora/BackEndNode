const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

const PORT = process.env.PORT || 7070
const dotenv = require('dotenv')
dotenv.config()

// COOKIES - SESSION - PASSPORT
const passport = require("passport")
// COOKIES - SESSION - PASSPORT

httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT))

// Config
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
// Config

// ROUTER
app.use('/api/products/', require('./Router/routerApiProducts.js'))
app.use('/api/carrito/', require('./Router/routerApiCart.js'))
app.use('/api/products-test/', require('./Router/routerFaker.js'))
app.use('/api/', require("./Router/routerFork.js"))
// ROUTER

//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 
const { loginPASSPORT, signupPASSPORT, deserializeUser, serializeUser, sessionPassport, checkAuthentication } = require("./PASSPORT/passport.js")

// LOGIN PASSPPROT
passport.use("login", loginPASSPORT());

// SIGNUP PASSPORT
passport.use("signup", signupPASSPORT());

deserializeUser();
serializeUser();

// VINCULAR EXPRESS CON PASSPORT
app.use(sessionPassport())
app.use(passport.initialize());
app.use(passport.session());
// VINCULAR EXPRESS CON PASSPORT

// Router - Passport
const functionsPassport = require("./Router/Passport/functions")
app.get("/", functionsPassport.getRoot);
app.get("/login", functionsPassport.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  functionsPassport.postLogin
);
app.get("/faillogin", functionsPassport.getFaillogin);
app.get("/signup", functionsPassport.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  functionsPassport.postSignup
);
app.get("/failsignup", functionsPassport.getFailsignup);
app.get("/logout", functionsPassport.getLogout);

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send("<h1>Ruta ok!</h1>");
});
// Router - Passport
//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 

// WEBSOCKETS
io.on('connection', async (socket) => {

  const { getMySQLProds, generateURL, getTheNumber, chatPage, products } = await require("./WEBSOCKETS/websockets")

  const THEFINALNORMALIZED = await getTheNumber()

  // connectionSocket()
  io.sockets.emit('chatPage', await THEFINALNORMALIZED)
  // -------- CHAT -------- 
  socket.on('testChat', async (data) => {
    console.log("testChat", data);
    chatPage(data)
    io.sockets.emit('chatPage', await THEFINALNORMALIZED)

  })
  // -------- CHAT -------- 

  // ------- PRODUCTS SOCKET --------
  let syncProductsMySQL = await getMySQLProds()
  socket.emit('products', syncProductsMySQL)
  socket.on('products', async (dataProds) => {
    products()
  })
  // ------- PRODUCTS SOCKET --------

  // ----------- FAKER - NORMALIZR -----------
  io.sockets.emit('prodsDesafio11', generateURL())
  socket.on('prodsDesafio11', async (dataProds) => {
    io.sockets.emit('prodsDesafio11 FAKER', generateURL())
  })
  // ----------- FAKER - NORMALIZR -----------
})

// WEBSOCKETS
