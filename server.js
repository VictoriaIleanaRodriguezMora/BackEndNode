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

/* LOG4JS */
const { log4jsConfigure } = require("./LOGGERS/log4.js")
const logger = log4jsConfigure.getLogger()
/* LOG4JS */
// Router - Passport
const functionsPassport = require("./Router/Passport/functions")

app.get("/", (req, res, next) => {
  logger.info(`-----------------------------------------`)
  console.log("asdagarsdhgaetdrhath");
  next();
},
  functionsPassport.GET_MainRoot
);

app.get("/login", (req, res, next) => {
  logger.info({ GET: `http://localhost${PORT}/login` })
  next();
}, functionsPassport.GET_LoginRoot);

app.post("/login", (req, res, next) => {
  logger.info({ POST: `http://localhost${PORT}/login` })
  next();
},
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  functionsPassport.POST_LoginRoot
);

app.get("/faillogin", (req, res, next) => {
  logger.warn({ GET: `http://localhost${PORT}/faillogin` })
  next();
},
  functionsPassport.GET_FailLoginRoot);

app.get("/signup", (req, res, next) => {
  logger.info({ GET: `http://localhost${PORT}/signup` })
  next();
},
  functionsPassport.GET_SignUp);

app.post(
  "/signup",
  (req, res, next) => {
    logger.error({ POST_ERROR: `http://localhost${PORT}/signup` })
    next();
  },
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  functionsPassport.POST_SignUp
);

app.get("/failsignup", (req, res, next) => {
  logger.info({ GET: `http://localhost${PORT}/failsignup` })
  next();
},
  functionsPassport.GET_FailSignUp);

app.get("/logout", (req, res, next) => {
  logger.info({ GET: `http://localhost${PORT}/logout` })
  next();
},
  functionsPassport.GET_LogOut);

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  logger.info({ GET: `http://localhost${PORT}/ruta-protegida` })
  const { username, password } = req.user;
  const user = { username, password };
  res.send(user);
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
    logger.info({ testChat: data })
    // console.log("testChat", data);
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
