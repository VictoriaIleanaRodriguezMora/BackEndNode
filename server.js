const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const { v4: uuidv4 } = require('uuid')

// Normalizr
const { normalize, schema } = require('normalizr')
// Normalizr

// SOCKET.IO
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
// SOCKET.IO

httpServer.listen(process.env.PORT || PORT, () =>
  console.log('SERVER ON', PORT),
)

// Configuraciones
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
// Configuraciones

// Principal Route
app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname })
})
// Principal Route

//  GET RUTA PARA EL POST
app.get('/form', (req, res) => {
  console.log('Route form')
  res.sendFile(__dirname + '/public/index.html')
})

// ROUTER
app.use('/api/products/', require('./Router/routerApiProducts.js'))
app.use('/api/carrito/', require('./Router/routerApiCart.js'))
app.use('/api/products-test/', require('./Router/routerFaker.js'))
// ROUTER

// Files initialization

// const ClassProds = require("./Classes/ClassProds")
// const chatFile = new ClassProds("./FilesPersistence/FileChat.json")
// const prodFile = new ClassProds("./FilesPersistence/FileProd.json")

// Files initialization


// DataBases

// MySQL Products
const { PetitionKNEX } = require("./Classes/ClassKNEX") // CLASS KNEX

const { optionsMySQL } = require("./options/options")
const productsMySQL = new PetitionKNEX(optionsMySQL, "products")
// productsMySQL.createTableProds() // This creates the table PRODUCTS
 
// SQLite3 - Messages
const { optionsSQLite3 } = require("./options/options")
const chatSQLite3 = new PetitionKNEX(optionsSQLite3, "messages")
// chatSQLite3.createTableChat() // This creates the table MESSAGES

// Mongo
let toProve = {
  author: {
    id: 'mail del usuario',
    nombre: 'nombre del usuario',
    apellido: 'apellido del usuario',
    edad: 'edad del usuario',
    alias: 'alias del usuario',
    avatar: 'url avatar (foto, logo) del usuario',
  },
  text: 'mensaje del usuario',
}

const ChatMongo = require('./DAOS/Chat/ClassMongoChat.js')
const schemaChat = require('./models/schemaChat.js')
const ChatMongoDB = new ChatMongo(schemaChat)
// ChatMongoDB.save(toProve)
// Mongo

// DataBases

const generateURL = require('./FAKER/fakerGeneratorProds/fakerGeneratorProds.js')
// fakerGenerator

// fakerGenerator

// WEBSOCKETS
io.on('connection', async (socket) => {
  console.log(`Servidor: Usuario conectado \nSocketUser ID: ${socket.id}`) // Cuando el usuario se conecta

  // Products Global Functionalities
  let syncProductsMySQL = await productsMySQL.select('*')
  socket.emit('products', syncProductsMySQL)

  // Products Socket Channel
  socket.on('products', async (dataProds) => {
    await productsMySQL.insert(dataProds)
    let newSyncProductsMySQL = await productsMySQL.select('*')
    io.sockets.emit('products', newSyncProductsMySQL)
  })
  // Products Socket  Channel

  // Chat Global Functionalities

  let chatFileSyncSQLite3 = await chatSQLite3.select('*')
  io.sockets.emit('chatPage', chatFileSyncSQLite3)

  io.sockets.emit('chatPage', normalizedDataa)
  socket.on('chatPage', async (dataChat) => {
    await chatSQLite3.insertCHAT(dataChat)

    let newChatFileSyncSQLite3 = await chatSQLite3.select('*')
    console.log(newChatFileSyncSQLite3);
    io.sockets.emit('chatPage', newChatFileSyncSQLite3)
  })

  const Mensajes = new schema.Entity('authors', {
    author: 'f',
  })

  // Chat Global Functionalities

  // ----------- FAKER - NORMALIZR -----------
  io.sockets.emit('prodsDesafio11', generateURL())

  socket.on('prodsDesafio11', async (dataProds) => {
    io.sockets.emit('prodsDesafio11 FAKER', generateURL())
  })
  // ----------- FAKER - NORMALIZR -----------
})
// WEBSOCKETS

// Ruta Por default
app.all('*', (req, res, next) => {
  res.status(404).json({
    error: '404',
    descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
  })
})
