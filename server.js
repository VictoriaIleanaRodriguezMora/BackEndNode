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


// WEBSOCKETS
io.on('connection', async (socket) => {
  // normalizr
  // CHAT CHAT

  let chaaaaaaat = await normalizarMensajes()
  const authorSchema = new schema.Entity('authors', { idAttribute: 'id' });
  const messageSchema = new schema.Entity('message', {
    author: authorSchema,
  }, { idAttribute: "_id" })


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

  socket.on('testChat', async (data) => {
    const chatMGGMGMMG = await ChatMongoDB.getAll()
    console.log("asasdasasdasdasfasdasdasd", data);
    // await messages.saveMsg(data);
    // MINE
    await ChatMongoDB.save(data)
    chaaaaaaat = await normalizarMensajes()
    const normalizedListMessages = normalize(chaaaaaaat, [messageSchema]);
    const respuesta = [normalizedListMessages, cantOriginal, cantNormalizada]

    // MNIE
    io.sockets.emit('testChatNORMALIZADO', await respuesta);
  });
  // CHAT CHAT

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
