const express = require('express')
const app = express()
const PORT = process.env.PORT || 5050

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
const ChatMongo = require('./DAOS/Chat/ClassMongoChat.js')
const schemaChat = require('./models/schemaChat.js')
const ChatMongoDB = new ChatMongo(schemaChat)
ChatMongoDB.connectMDB()
// Mongo CHAT

httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT))
// Config
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Config


/* LOG4JS */
const { log4jsConfigure } = require("./LOGGERS/log4.js")
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
    res.redirect("/signup");
  }
}
//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 

// Router - Passport
const functionsPassport = require("./Router/Passport/functions")

app.get("/", checkAuthentication, (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/` })
  next();
},
  functionsPassport.GET_MainRoot
);

app.get("/login", (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/login` })
  next();
}, functionsPassport.GET_LoginRoot);

app.post("/login", (req, res, next) => {
  logger.info({ POST: `http://localhost:${PORT}/login` })
  next();
},
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  functionsPassport.POST_LoginRoot
);

app.get("/faillogin", (req, res, next) => {
  logger = log4jsConfigure.getLogger("error")
  logger.error({ GET_FAIL: `http://localhost:${PORT}/faillogin` })
  next();
},
  functionsPassport.GET_FailLoginRoot);

app.get("/signup", (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/signup` })
  next();
},
  functionsPassport.GET_SignUp);

app.post(
  "/signup",
  (req, res, next) => {
    logger.error({ POST_ERROR: `http://localhost:${PORT}/signup` })
    next();
  },
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  functionsPassport.POST_SignUp
);

app.get("/failsignup", (req, res, next) => {
  logger = log4jsConfigure.getLogger("error")
  logger.error({ GET_FAIL: `http://localhost:${PORT}/failsignup` })
  next();
},
  functionsPassport.GET_FailSignUp);

app.get("/logout", (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/logout` })
  next();
},
  functionsPassport.GET_LogOut);

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  logger.info({ GET: `http://localhost:${PORT}/ruta-protegida` })
  const { username, password } = req.user;
  const user = { username, password };
  res.send(user);
});

app.get("/profileuser", checkAuthentication, (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/profileuser` })
  next();
},
  functionsPassport.GET_ProfileUser);

app.get("/carritos", (req, res, next) => {
  logger.info({ GET: `http://localhost:${PORT}/carritos` })
  next();
},
  functionsPassport.GET_Carritos);

app.post("/carritos", (req, res, next) => {
  logger.info({ POST: `http://localhost:${PORT}/carritos` })
  next();
},
  functionsPassport.POST_Carritos);

// Router - Passport

 

// WEBSOCKETS
io.on('connection', async (socket) => {
  const { getMySQLProds, generateURL, getTheNumber, chatPage, products } = await require("./WEBSOCKETS/websockets")

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
  let syncProductsMySQL = await getMySQLProds()
  socket.emit('products', syncProductsMySQL)
  socket.on('products', async (dataProds) => {
    await products(dataProds)
    io.sockets.emit('products', syncProductsMySQL)

  })
  // ------- PRODUCTS SOCKET --------

  // ----------- FAKER - NORMALIZR -----------
  io.sockets.emit('fakerData', generateURL())
  socket.on('fakerData', async (dataProds) => {
    io.sockets.emit('fakerData', generateURL())
  })
  // ----------- FAKER - NORMALIZR -----------
})
// WEBSOCKETS

// ROUTER
app.use('/api/products/', require('./Router/routerApiProducts.js'))
app.use('/api/carrito/', require('./Router/routerApiCart.js'))
app.use('/auth/', require('./Router/RouterAuth.js'))
// ROUTER