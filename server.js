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
app.use("/passport", require("./Router/Passport/routerPassport"))
// ROUTER


//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 
const { loginPASSPORT, signupPASSPORT, deserializeUser, serializeUser, sessionPassport } = require("./PASSPORT/passport.js")

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

