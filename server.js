const express = require('express')
const app = express()
const PORT = 5050

// COOKIES - SESSION - PASSPORT
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require("bcrypt");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const UsuariosSchemaPassport = require("./models/schemaUsuariosPassport.js")
// COOKIES - SESSION - PASSPORT

// SOCKET.IO
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
// SOCKET.IO

// Mongo CHAT
const { DAO__Chat } = require("./PERSISTENCIA/DAOs/main__daos")
DAO__Chat.connectMDB()
// Mongo CHAT

httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT))
// Config
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Config


/* LOG4JS */
const { log4jsConfigure } = require("./SERVICIO/LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */


//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 

// -- LOGIN --
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    UsuariosSchemaPassport.findOne({ username }, (err, user) => {
      if (err) {
        logger.info({ error: "LOGIN" })
        return done(err)
      };

      if (!user) {
        logger.info({ user_not_found: username })
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        logger.info({ invalid: "password" })
        return done(null, false);
      }

      return done(null, user);
    });
  })
);
// -- LOGIN --

// -- SIGN UP --
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      UsuariosSchemaPassport.findOne({ username: username }, function (err, user) {
        if (err) {
          logger.info({ error: "SIGN UP" })
          return done(err);
        }

        if (user) {
          logger.info({ SIGN_UP: "User already exists" })
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };

        UsuariosSchemaPassport.create(newUser, (err, userWithId) => {
          if (err) {
            logger.info({ SIGN_UP: "Error in Saving user" })
            return done(err);
          }
          logger.debug(user)
          logger.debug("User Registration succesful")
          return done(null, userWithId);
        });
      });
    }
  )
);
// -- SIGN UP --

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UsuariosSchemaPassport.findById(id, done);
});


app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 3600,
    }),
    cookie: { maxAge: 60000 * 10 },

    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize());
app.use(passport.session());

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/signup");
  }
}
//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 

// Router - Passport
const { GET_MainRoot } = require("./CONTROLLER/controllerAuth")

app.get("/", checkAuthentication, (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/` })
  next();
},
  GET_MainRoot
);



// WEBSOCKETS
const {  generateURL } =  require("./SERVICIO/WEBSOCKETS/websockets")

io.on('connection', async (socket) => {
  const { getMongoProds, generateURL, getTheNumber, chatPage, saveProds } = await require("./SERVICIO/WEBSOCKETS/websockets")

  const THEFINALNORMALIZED = await getTheNumber()
  io.sockets.emit('chatPage', await THEFINALNORMALIZED)

  // -------- CHAT -------- 
  socket.on('mnsChat', async (data) => {
    logger.info({ testChat: data })
    chatPage(data)
    io.sockets.emit('chatPage', await THEFINALNORMALIZED)
  })
  // -------- CHAT -------- 

  // ------- PRODUCTS SOCKET --------
  let syncProductsMySQL = await getMongoProds()
  socket.emit('products', syncProductsMySQL)
  socket.on('products', async (dataProds) => {
    await saveProds(dataProds)
    io.sockets.emit('products', syncProductsMySQL)

  })
  // ------- PRODUCTS SOCKET --------

  // ----------- FAKER - NORMALIZR -----------
  io.sockets.emit('fakerData', generateURL())
  socket.on('fakerData', async (dataFaker) => {
    io.sockets.emit('fakerData', generateURL())
  })
  // ----------- FAKER - NORMALIZR -----------
})
// WEBSOCKETS
 
app.get("/faker", (req, res) => {
  console.log("faker");
  res.json(generateURL())
})

// ROUTER
app.use('/api/products/', require('./Router/routerApiProducts.js'))
app.use('/api/carrito/', require('./Router/routerApiCart.js'))
app.use('/auth/', require('./Router/RouterAuth.js'))
app.use('/carritos/', require('./Router/RouterCarritos.js'))
// app.use("/faker")
// ROUTER