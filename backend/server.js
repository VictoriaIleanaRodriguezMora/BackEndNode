const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

const dotenv = require('dotenv')
dotenv.config()

// YARGS - PORT
const yargs = require("yargs")(process.argv.slice(2))
const args = yargs.default({ PORT: 7070 }).argv
const PORT = process.env.PORT || 5000
// nodemon server.js --PORT 5050
console.log(`Puerto (${(args.PORT)})`);
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
let logger = log4jsConfigure.getLogger()
/* LOG4JS */
// Router - Passport
const functionsPassport = require("./Router/Passport/functions")

app.get("/api", (req, res) => {
  res.json({ "users": ["uno", "dos", "tres"] })
})

app.get("/", (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/` })
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
  logger = log4jsConfigure.getLogger("error")
  logger.error({ GET_FAIL: `http://localhost${PORT}/faillogin` })
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
  logger = log4jsConfigure.getLogger("error")
  logger.error({ GET_FAIL: `http://localhost${PORT}/failsignup` })
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

  // -------- CHAT -------- 
  const { getMySQLProds, generateURL, getTheNumber, chatPage, products } = await require("./WEBSOCKETS/websockets")

  const THEFINALNORMALIZED = await getTheNumber()

  // connectionSocket()
  io.sockets.emit('chatPage', await THEFINALNORMALIZED)
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
  io.sockets.emit('fakerInfo', generateURL())
  socket.on('fakerInfo', async (dataProds) => {
    io.sockets.emit('fakerInfo FAKER', generateURL())
  })

  // ----------- FAKER - NORMALIZR -----------

  io.sockets.emit("messages", "MSG")
})
// WEBSOCKETS











/* 
const webSocketsServerPort = 2000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000');


const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);

      // broadcasting message to all connected clients
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('sent Message to: ', clients[key]);
      }
    }
  })

  connection.on('fakerTest', function (faker) {
    if (faker.type === 'utf8') {
      console.log('Received FAKER: ', faker.utf8Data);
    }
    })

});



 */