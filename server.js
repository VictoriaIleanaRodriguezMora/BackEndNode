const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

const PORT = process.env.PORT || 7070
const dotenv = require('dotenv')
dotenv.config()

// COOKIES - SESSION - PASSPORT
const routerPassport = require("./Router/routerPassport.js")
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
// ROUTER



//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 
const { loginPASSPORT, signupPASSPORT, deserializeUser, serializeUser, sessionPassport, checkAuthentication } = require("./PASSPORT/passport")

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

//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 

app.get("/", routerPassport.getRoot);
app.get("/login", routerPassport.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routerPassport.postLogin
);
app.get("/faillogin", routerPassport.getFaillogin);
app.get("/signup", routerPassport.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routerPassport.postSignup
);
app.get("/failsignup", routerPassport.getFailsignup);
app.get("/logout", routerPassport.getLogout);

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send("<h1>Ruta ok!</h1>");
});

// PASSPORT

app.get('/info', (req, res) => {
  const obj = {
    nodeV: process.version,
    memoryUsage: process.memoryUsage().rss,
    operatingSystem: process.platform,
    folderProject: process.cwd(),
    idProcess: process.pid
  }
})
// console.log( process.pid);

app.get("api/randoms", (req, res) => {

})

// WEBSOCKETS
io.on('connection', async (socket) => {

  const { connectionSocket, getMySQLProds, normalizarMensajes, generateURL, some, finalNumbersNormalized, chatPage, products, finalNumbersNormalized2 } = await require("./WEBSOCKETS/websockets")

  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", await some());

  const THEFINALNORMALIZED = await some()


  connectionSocket()
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

