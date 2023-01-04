const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const { v4: uuidv4 } = require('uuid')

// Normalizr
const { normalize, schema, denormalize } = require('normalizr')
// Normalizr

// SOCKET.IO
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
// SOCKET.IO

httpServer.listen(process.env.PORT || PORT, () =>
  console.log('SERVER ON http://localhost:8000/ '),
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

async function normalizarMensajes() {
  const Messages = await ChatMongoDB.getAll();
  // console.log("M -------------------------------------------{");
  // console.log(Messages);
  const ListMessages = [];
  for (const message of Messages) {
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
      _id: JSON.stringify(message._id)
    }
    ListMessages.push(mensajeNuevo)

    // return ListMessages
  }
  return ListMessages

}

// F F F F F F F F F F F F  FF
const ClassFirebase = require('./DAOS/Chat/ClassFirebase')
const chatFirebase = new ClassFirebase('chat')
// arrrr

// WEBSOCKETS
io.on('connection', async (socket) => {
  // normalizr
  // CHAT CHAT

  const authorSchema = new schema.Entity(
    'authors',
    {},
    { idAttribute: 'email' },
  )
  const messageSchema = new schema.Entity('messages', {
    author: authorSchema,
  })
  const chat = new schema.Entity('chat', {
    messages: messageSchema,
    author: authorSchema,
  })
  // const normalizedDataa = normalize(chaaaaaaaaaaaaat, [chat])
  // const normalizedDataa = normalize(arrOrig, [chat])

  const normalizedListMessages = normalize(chaaaaaaat, [messageSchema]);
  const denormalizedListMessages = denormalize(normalizedListMessages.result, [messageSchema], normalizedListMessages.entities);

  const cantOriginal = JSON.stringify(chaaaaaaat).length;
  const cantNormalizada = JSON.stringify(normalizedListMessages).length;
  const respuesta = [normalizedListMessages, cantOriginal, cantNormalizada]
  // normalizr


  // console.log(dataBaseMongoChat) // LLEGA
  // console.log("chatMGGMGMMG", chatMGGMGMMG); // esto sí llega, el error es otro 
  console.log('SOCKET CONECTADO');
  io.sockets.emit('testChatNORMALIZADO', await respuesta);
  // console.log(await messages.getAll())

  socket.on('testChat', async (dataSINnormalizar) => {
    console.log('-------------------------')
    console.log(dataSINnormalizar) // LLEGA
    chatFirebase.saveChat(dataSINnormalizar)
    const authorSchema = new schema.Entity(
      'authors',
      {},
      { idAttribute: 'email' },
    )
    const messageSchema = new schema.Entity('messages', {
      author: authorSchema,
    })
    const chat = new schema.Entity('chat', {
      messages: messageSchema,
      author: authorSchema,
    })
    // const normalizedDataa = normalize(arrOrig, [chat])
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
