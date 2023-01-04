const express = require('express')
const app = express()
const PORT = process.env.PORT || 9090
const { v4: uuidv4 } = require('uuid')

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

httpServer.listen(PORT, () =>
  console.log('SERVER ON http://localhost:' + PORT)
);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


// ROUTER
app.use('/api/products/', require('./Router/routerApiProducts.js'))
app.use('/api/carrito/', require('./Router/routerApiCart.js'))
app.use('/api/products-test/', require('./Router/routerFaker.js'))
// ROUTER

// fakerGenerator
const generateURL = require('./FAKER/fakerGeneratorProds/fakerGeneratorProds.js')
// fakerGenerator

// MySQL Products
const { PetitionKNEX } = require('./Classes/ClassKNEX') // CLASS KNEX

const { optionsMySQL } = require('./options/options')
const productsMySQL = new PetitionKNEX(optionsMySQL, 'products')
// productsMySQL.createTableProds() // This creates the table PRODUCTS

// SQLite3 - Messages
const { optionsSQLite3 } = require('./options/options')
const chatSQLite3 = new PetitionKNEX(optionsSQLite3, 'messages')
// chatSQLite3.createTableChat() // This creates the table MESSAGES


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

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


io.on('connection', async (socket) => {
  // normalizr

  let chaaaaaaat = await normalizarMensajes()
  const authorSchema = new schema.Entity('authors', { idAttribute: 'id' });
  const messageSchema = new schema.Entity('message', {
    author: authorSchema,
  }, { idAttribute: "_id" })


  const normalizedListMessages = normalize(chaaaaaaat, [messageSchema]);
  const denormalizedListMessages = denormalize(normalizedListMessages.result, [messageSchema], normalizedListMessages.entities);

  // const cantOriginal = JSON.stringify(chaaaaaaat).length;
  // const cantNormalizada = JSON.stringify(normalizedListMessages).length;
  const respuesta = [normalizedListMessages]
  // normalizr






  // console.log(dataBaseMongoChat) // LLEGA
  // console.log("chatMGGMGMMG", chatMGGMGMMG); // esto sí llega, el error es otro 
  console.log('SOCKET CONECTADO');
  io.sockets.emit('msg-list', await respuesta);
  // console.log(await messages.getAll())

  socket.on('msg', async (data) => {
    const chatMGGMGMMG = await ChatMongoDB.getAll()
    console.log("asasdasasdasdasfasdasdasd", data);
    // await messages.saveMsg(data);
    // MINE
    await ChatMongoDB.save(data)
    chaaaaaaat = await normalizarMensajes()
    const normalizedListMessages = normalize(chaaaaaaat, [messageSchema]);
    const respuesta = [normalizedListMessages]

    // MNIE
    io.sockets.emit('msg-list', await respuesta);


  });

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



