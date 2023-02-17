const express = require('express')
const app = express()
const PORT = process.env.PORT || 5050

// COOKIES - SESSION - PASSPORT
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require("bcrypt");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const UsuariosSchema = require("./models/schemaUsuarios.js")
// COOKIES - SESSION - PASSPORT


// SOCKET.IO
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
// SOCKET.IO

// Mongo CHAT
const ChatMongo = require('./DAOS/Chat/ClassMongoChat.js')
const schemaChat = require('./models/schemaChat.js')
const ChatMongoDB = new ChatMongo(schemaChat)
// Mongo CHAT

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

/* LOG4JS */
const { log4jsConfigure } = require("./LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */


//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 

// login
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    UsuariosSchema.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);
// login

// signup
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      UsuariosSchema.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        UsuariosSchema.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);
// signup

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UsuariosSchema.findById(id, done);
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
    await products(dataProds)
    io.sockets.emit('products', syncProductsMySQL)

  })
  // ------- PRODUCTS SOCKET --------

  // ----------- FAKER - NORMALIZR -----------
  io.sockets.emit('prodsDesafio11', generateURL())
  socket.on('prodsDesafio11', async (dataProds) => {
    console.log("wwwwwwwwwwwwwwwwwwwww", dataProds);
    io.sockets.emit('prodsDesafio11', generateURL())
  })
  // ----------- FAKER - NORMALIZR -----------
})
// WEBSOCKETS
