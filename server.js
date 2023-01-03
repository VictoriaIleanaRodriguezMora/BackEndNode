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
const { PetitionKNEX } = require('./Classes/ClassKNEX') // CLASS KNEX

const { optionsMySQL } = require('./options/options')
const productsMySQL = new PetitionKNEX(optionsMySQL, 'products')
// productsMySQL.createTableProds() // This creates the table PRODUCTS

// SQLite3 - Messages
const { optionsSQLite3 } = require('./options/options')
const chatSQLite3 = new PetitionKNEX(optionsSQLite3, 'messages')
// chatSQLite3.createTableChat() // This creates the table MESSAGES

// Mongo
const ChatMongo = require('./DAOS/Chat/ClassMongoChat.js')
const schemaChat = require('./models/schemaChat.js')
const ChatMongoDB = new ChatMongo(schemaChat)
// Mongo

// DataBases

// fakerGenerator
const generateURL = require('./FAKER/fakerGeneratorProds/fakerGeneratorProds.js')
// fakerGenerator

// arrrr
const arrOrig = [
  {
    author: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
      email: 'algo1@gmail.com',
      url: 'https://cdn-icons-png.flaticon.com/512/1236/1236123.png',
    },
    id: '63adfba4810bace0aef97105',
    text: 'mensaje del usuario',
    fechaParsed: '01/01/2023, 23:51:49',
  },
  {
    author: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
      email: 'algo2@gmail.com',
      url: 'https://cdn-icons-png.flaticon.com/512/1236/1236123.png',
    },
    id: '63ae0d30165cd8e796ac67b3',
    text: 'mensaje del usuario',
    fechaParsed: '01/01/2023, 23:51:49',
  },
  {
    author: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
      email: 'algo3@gmail.com',
      url: 'https://cdn-icons-png.flaticon.com/512/1236/1236123.png',
    },
    id: '63aef77537872f9bbb2483d2',
    text: 'mensaje del usuario',
    fechaParsed: '01/01/2023, 23:51:49',
  },
]

// F F F F F F F F F F F F  FF
const ClassFirebase = require('./DAOS/Chat/ClassFirebase')
const chatFirebase = new ClassFirebase('chat')

// WEBSOCKETS
io.on('connection', async (socket) => {
  async function tryFb() {
    let chatDBFb = await chatFirebase.getAll()
    let arrFinal = []

    for (let i = 0; i < chatDBFb.length; i++) {
      const e = chatDBFb[i]
      // console.log(e)
      arrFinal.push({
        author: {
          id: e.id,
          nombre: e.author.nombre,
          apellido: e.author.apellido,
          edad: e.author.edad,
          alias: e.author.alias,
          avatar: e.author.avatar,
          email: e.author.email,
          url: e.author.url,
        },
        text: e.text,
        id: e.id,
        fechaParsed: e.fechaParsed,
      })
    }
    console.log(arrFinal.length);
    return arrFinal
  }

  let chaaaaaaaaaaaaat = await tryFb()
  const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' },)
  const messageSchema = new schema.Entity('messages', { author: authorSchema, })
  const chat = new schema.Entity('chat', { messages: messageSchema, author: authorSchema, })
  const normalizedDataa = normalize(chaaaaaaaaaaaaat, [chat])

  console.log(`Servidor: Usuario conectado \nSocketUser ID: ${socket.id}`) // Cuando el usuario se conecta

  //  ------- CHAT SOCKET -----------

  /*   let chatFileSyncSQLite3 = await chatSQLite3.select('*')
  io.sockets.emit('chatPage', chatFileSyncSQLite3)
  
  io.sockets.emit('chatPage', normalizedDataa)
  socket.on('chatPage', async (dataChat) => {
    await chatSQLite3.insertCHAT(dataChat)
    
    let newChatFileSyncSQLite3 = await chatSQLite3.select('*')
    console.log(newChatFileSyncSQLite3)
    io.sockets.emit('chatPage', newChatFileSyncSQLite3)
  })
  */

  io.sockets.emit('testChatNORMALIZADO', normalizedDataa)

  socket.on('testChat', async (dataSINnormalizar) => {
    console.log(dataSINnormalizar) // LLEGA
    chatFirebase.saveChat(dataSINnormalizar)
    const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' },)
    const messageSchema = new schema.Entity('messages', { author: authorSchema, })
    const chat = new schema.Entity('chat', { messages: messageSchema, author: authorSchema, })
    chaaaaaaaaaaaaat = await tryFb()
    const normalizedDataa = normalize(chaaaaaaaaaaaaat, [chat])
    io.sockets.emit('testChatNORMALIZADO', normalizedDataa)
  })
  //  ------- CHAT SOCKET -----------

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

// Ruta Por default
app.all('*', (req, res, next) => {
  res.status(404).json({
    error: '404',
    descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
  })
})
