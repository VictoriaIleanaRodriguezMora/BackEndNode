const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

const dotenv = require('dotenv')
dotenv.config()

// YARGS - PORT
const yargs = require("yargs")(process.argv.slice(2))
const args = yargs.default({ PORT: 7070 }).argv
const PORT = process.env.PORT || args.PORT
// nodemon server.js --PORT 5050
console.log(`Puerto desde YARGS (${(args.PORT)})`);
// YARGS - PORT

// COOKIES - SESSION - PASSPORT
const passport = require("passport")
// COOKIES - SESSION - PASSPORT

httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT))

// Config
const compression = require('compression')

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(compression())
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
app.get("/", functionsPassport.GET_MainRoot);
app.get("/login", functionsPassport.GET_LoginRoot);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  functionsPassport.POST_LoginRoot
);
app.get("/faillogin", functionsPassport.GET_FailLoginRoot);
app.get("/signup", functionsPassport.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  functionsPassport.POST_SignUp
);
app.get("/failsignup", functionsPassport.GET_FailSignUp);
app.get("/logout", functionsPassport.GET_LogOut);

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
