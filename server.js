const express = require('express')
const app = express()
const PORT = process.env.PORT || 7070

// COOKIES
const session = require('express-session')
const MongoStore = require('connect-mongo')
// COOKIES

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
// cookies
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    ttl: 3600,
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  }),
)
// cookies
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
const { Logger } = require('sass')
const chatSQLite3 = new PetitionKNEX(optionsSQLite3, 'messages')
// chatSQLite3.createTableChat() // This creates the table MESSAGES

// Main PATH
app.get('/', (req, res) => {
  /* ninguno de estos log se ve */
  console.log(' req.session.user', req.session.user)

  console.log(req.session.user)
  if (req.session.cont) {
    req.session.cont++
    console.log('nos visitaste ' + req.session.cont)
  } else {
    req.session.cont = 1
    console.log('nos visitaste ' + 1)
  }
  res.sendFile('index.html', { root: __dirname })
})

app.get('/login', (req, res) => {
  // res.render("pages/login.ejs", { title: "EJS FORM" })
  console.log('LOGIN')
  const { nameLogin, contrasenaLogin } = req.body

  res.sendFile('/public/login.html', { root: __dirname })
})

app.use('/sign', (req, res) => {
  console.log('SIGN')

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
  res.render('pages/sign.ejs', {
    nameLoginn: req.session.user,
    contrasenaLogin,
  })
})

app.get('/logout', (req, res) => {
  console.log('LOGOUT')
  req.session.destroy((err) => {
    if (err) {
      // res.send("no pudo deslogear");
      res.render('pages/logout.ejs', { content: 'No se pudo desloguear' })
    } else {
      // res.send('borramos todos quedate tranquilo que ya estas deslogeado')
      res.render('pages/logout.ejs', { content: 'ya estas deslogueado' })
    }
  })
})

app.get('/showsession', (req, res) => {
  res.json(req.session)
})
// Main PATH

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
