// fakerGenerator
const generateURL = require('./FAKER/fakerGeneratorProds/fakerGeneratorProds.js')
// fakerGenerator

// percentageCalculator
const percentageCalculator = require('./FAKER/percentageCalculator/percentageCalculator.js')
// percentageCalculator

// MySQL Products
const { PetitionKNEX } = require('./Classes/ClassKNEX') // CLASS KNEX

const { optionsMySQL } = require('./options/options')
const productsMySQL = new PetitionKNEX(optionsMySQL, 'products')
// productsMySQL.createTableProds() // This creates the table PRODUCTS

// SQLite3 - Messages
const { optionsSQLite3 } = require('./options/options')
const chatSQLite3 = new PetitionKNEX(optionsSQLite3, 'messages')
// chatSQLite3.createTableChat() // This creates the table MESSAGES

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

//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 


const express = require('express')
const app = express()
const PORT = process.env.PORT || 7070

// COOKIES - SESSION - PASSPORT
const session = require('express-session')
const MongoStore = require('connect-mongo')


const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const UsuariosSchema = require("./models/schemaUsuarios.js")
// COOKIES - SESSION - PASSPORT

// Normalizr
const { normalize, schema, denormalize } = require('normalizr')
// Normalizr

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



// VINCULAR EXPRESS CON PASSPORT
// cookies
// mi sesion creada con passport va a persistir en mongo



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

// cookies
// VINCULAR EXPRESS CON PASSPORT


// Main PATH
app.get('/', auth, (req, res) => {
  console.log(' ----------- / ----------- ')

  res.render('pages/indexLogPOST.ejs', { nameLoginn: req.session.user })

})

function auth(req, res, next) {
  console.log('AAAAAAAAAAAAAAAAAAAAUTH')
  if (req.session.user) {
    console.log('IIIIIIIIIIIIIF')
    return next()
  } else {
    return res.redirect('/login')
  }
}

app.get('/login', (req, res) => {
  console.log(' ----------- LOGIN ----------- ')
  const { nameLogin, contrasenaLogin } = req.body
  res.sendFile('/public/login.html', { root: __dirname })
})

app.post('/', (req, res) => {
  console.log(' ----------- POST ----------- ')

  const { nameLogin, contrasenaLogin } = req.body
  console.log(nameLogin, contrasenaLogin)
  if (nameLogin !== 'nombre' && req.session.user !== 'nombre') {
    console.log(req.session.user)
    return res.send('login failed')
  } else {
    req.session.user = nameLogin
    req.session.admin = true
  }
  console.log('req.session', req.session)
  console.log(' req.session.user', req.session.user)
  // res.json({ nameLogin, contrasenaLogin })
  res.render('pages/indexLogPOST.ejs', {
    nameLoginn: req.session.user,
    contrasenaLogin,
  })
})

app.get('/logout', (req, res) => {
  console.log(' ----------- LOGOUT ----------- ')
  const { user } = req.session
  req.session.destroy((err) => {
    if (err) {
      // res.send("no pudo deslogear");
      res.render('pages/logout.ejs', { content: 'No se pudo desloguear' })
    } else {
      res.render('pages/logout.ejs', {
        content: 'ya estas deslogueado: ',
        user,
      })
    }
  })
})

app.get('/showsession', auth, (req, res) => {
  console.log(' ----------- SHOWSESSION ----------- ')
  res.json(req.session)
})

app.get('/main', auth, (req, res) => {
  console.log(' ----------- main ----------- ')
  res.render('pages/indexLogPOST.ejs', { nameLoginn: req.session.user })

})



// Main PATH

// WEBSOCKETS
// normalizarMensajes
async function normalizarMensajes() {
  const MongoCHAT = await ChatMongoDB.getAll()

  const arrFinalMsgs = []

  for (const message of MongoCHAT) {
    const mensajeNuevo = {
      author: {
        id: message.author.id,
        nombre: message.author.nombre,
        apellido: message.author.apellido,
        edad: message.author.edad,
        alias: message.author.alias,
        avatar: message.author.avatar,
      },
      text: message.text,
      fechaParsed: message.fechaParsed,
      _id: JSON.stringify(message._id),
    }
    arrFinalMsgs.push(mensajeNuevo)
  }
  return arrFinalMsgs
}
// normalizarMensajes

io.on('connection', async (socket) => {
  //  ---- NORMALIZR ---- NORMALIZR ----
  let chatNormalized = await normalizarMensajes()
  const authorSchema = new schema.Entity('authors', { idAttribute: 'id' })
  const messageSchema = new schema.Entity(
    'message',
    { author: authorSchema },
    { idAttribute: '_id' },
  )

  const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
  const FINALchatNormalizedDENORMALIZED = denormalize(
    FINALchatNormalized.result,
    [messageSchema],
    FINALchatNormalized.entities,
  )

  // PORCENTAJE
  const cantNORMALIZED = JSON.stringify(chatNormalized).length
  const cantDENORMALIZED = JSON.stringify(FINALchatNormalizedDENORMALIZED)
    .length
  const percetageNrmld = percentageCalculator(cantNORMALIZED, cantDENORMALIZED)
  // PORCENTAJE

  const respuesta = [FINALchatNormalized, percetageNrmld]
  //  ---- NORMALIZR ---- NORMALIZR ----

  console.log('SOCKET CONECTADO')
  io.sockets.emit('chatPage', await respuesta)

  socket.on('testChat', async (data) => {
    await ChatMongoDB.save(data)
    chatNormalized = await normalizarMensajes()
    const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
    const respuesta = [FINALchatNormalized]
    io.sockets.emit('chatPage', await respuesta)
  })

  // ------- PRODUCTS SOCKET --------
  let syncProductsMySQL = await productsMySQL.select('*')

  socket.emit('products', syncProductsMySQL)

  socket.on('products', async (dataProds) => {
    await productsMySQL.insert(dataProds)

    let newSyncProductsMySQL = await productsMySQL.select('*')

    io.sockets.emit('products', newSyncProductsMySQL)
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
