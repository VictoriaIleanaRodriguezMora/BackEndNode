const express = require('express')
const apiCart = express.Router()

const IsAdmin = true

// ----- toProve -----
const toProve = {
  timestamp: '',
  products: {
    code: 'xxx',
    description: 'Descripcion',
    photo: 'https://',
    name: 'libro',
    price: 200,
    stock: 10,
    timestamp: '',
    id: '',
  },
}
// ----- toProve -----

// DAOS
// FileSystem
const { CarritosDaoFileSystem } = require('.././DAOS/mainDaos.js')
const carritos = new CarritosDaoFileSystem()

// Mongo */
const { CarritosDaoMongo } = require('.././DAOS/mainDaos.js')
const modelCarrito = require('../models/schemaCarritos.js')
const carritosMongo = new CarritosDaoMongo(modelCarrito)

// Firebase

const { CarritosDaoFirebase } = require('.././DAOS/mainDaos.js')
const { brotliDecompressSync } = require('zlib')
const carritosFirebase = new CarritosDaoFirebase('carritos')
// carritosFirebase.save(toProve)
// carritosFirebase.getByIdCart("7d5b517d-5e7f-45df-9a48-6568d0973aea")
// DAOS

// carritos.getAll()
// GET /api/carrito/ - Return all the products
apiCart.get('/', async (req, res) => {
  /*
  // FileSystem
  const syncProducts = await carritos.getAll()
  console.log(" ------- FileSystem ------- ")
  res.json(syncProducts)
  // FileSystem
  */

<<<<<<< HEAD
    // /* 
    // FileSystem
    const syncProducts = await carritos.getAll()
    res.json(syncProducts)
    // FileSystem
    // */
=======
  /*
  // Mongo
  const cartMongo = await carritosMongo.getAll()
  console.log(" ------- Mongo ------- ")
  res.json(cartMongo)
  // Mongo
  */
>>>>>>> desafio10-clase20

  /*
  // Firebase
  const GETprodsFirebase = await carritosFirebase.getAll()
  console.log(" ------  FIREBASE ------ ");
  res.json(GETprodsFirebase)
  // Firebase
  */

  console.log('GET - Route: /api/carrito/')
})

// GET /api/carrito/:id - Return the product specified by ID parameters
apiCart.get('/:id', async (req, res) => {
  const { id } = req.params

  /*
  // FileSystem
  const syncGetById = await carritos.getById(id)
  console.log(' ------- FileSystem ------- ')
  res.json(syncGetById)
  // FileSystem
  */

  /*
  // Mongo
  const cartMongo = await carritosMongo.getById(id)
  console.log(" ------- Mongo ------- ")
  res.json(cartMongo)
  // Mongo
  */

  // /*
  // Firebase
  const GETcarritosFirebase = await carritosFirebase.getById(id)
  console.log(' ------  FIREBASE ------ ')
  res.json(GETcarritosFirebase)
  // Firebase
  //  */

  console.log('GET - Route: /api/carrito/:id')
})

// GET /api/carrito/:id/products - Return the product specified by ID parameters
apiCart.get('/:id/products', async (req, res) => {
  const { id } = req.params

  /*
  // FileSystem
  const syncGetById = await carritos.getByIdCart(id)
  console.log(' ------- FileSystem ------- ')
  res.json(syncGetById)
  // FileSystem
  */

  /*
  // Mongo
  const GETcartMongo = await carritosMongo.getByIdCart(id)
  console.log(' ------- Mongo ------- ')
  res.json(GETcartMongo)
  // Mongo
  */

  /*
  // Firebase
  const GETcarritosFirebase = await carritosFirebase.getByIdCart(id)
  console.log(' -------  FIREBASE ------- ')
  res.json(GETcarritosFirebase)
  // Firebase
   */

  console.log('GET - Route: /api/carrito/:id')
})

// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/
apiCart.post('/', async (req, res, next) => {
  const { body } = req

  /*
  // FileSystem
  const elementSaved = await carritos.save(body)
  console.log(' ------- FileSystem ------- ')
  res.json(elementSaved)
  // FileSystem
  */

  /*
  // Mongo
  const POSTCarritosMongo = await carritosMongo.save(body)
  console.log(' ------- Mongo ------- ')
  res.json(POSTCarritosMongo)
  // Mongo
  */

  /*
  // Firebase
  const POSTcarritosFirebase = await carritosFirebase.save(body)
  res.json(POSTcarritosFirebase)
  // Firebase
  */

  console.log('POST - Route: /api/carrito/:id')
})

// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/:id/products
apiCart.post('/:id/products', async (req, res) => {
  const { body } = req
  const { id } = req.params
  const { title } = body
  const { price } = body

  /* 
    // FileSystem
    const cartFileSsytem = await carritos.updateById(id,  body)
    res.json(cartFileSsytem)
    console.log(' ------- FileSystem ------- ')
    // FileSystem
    */

  /*
  // Mongo
  const cartMongo = await carritosMongo.saveCart(id, body)
  console.log(' ------- Mongo ------- ')
  res.json(cartMongo)
  // Mongo
  */

  // /*
  // Firebase
  const cartFirebase = await carritosFirebase.saveCart(id, body)
  console.log(' ------- Firebase ------- ')
  res.json(cartFirebase)
  // Firebase
  // */

  console.log('POST - Route: /api/carrito/:id')
})

// PUT /api/carrito/:id Receives an ID and update by ID.
// http://localhost:8000/api/carrito/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiCart.put(
  '/:id',
  async (req, res, next) => {
    if (!IsAdmin) {
      console.log('Not autorize page')
      res.json({ error: 'Not autorize page' })
    } else {
      next()
    }
  },
  async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    const { title } = body
    const { price } = body

    /* 
        // FileSystem
        const updateById = await carritos.updateById(id, title, price)
        res.json(updateById)
        // FileSystem
        */

    /*  
        // Mongo
        const PUTCartsMongo = await carritosMongo.updateByIdCart(id, title, price)
        console.log("PUTCartsMongo", PUTCartsMongo);
        res.json(PUTCartsMongo)
        // Mongo
        */

    /*
    // Firebase
    const PUTcarritosFirebase = await carritosFirebase.updateById(
      id,
      title,
      price,
    ) // I can improve this one
    res.json(PUTcarritosFirebase)
    // Firebase
    */

    console.log('PUT - Route /api/productos/:id ')
  },
)

// DELETE /api/carrito/:id Receives an ID and delete by ID.
apiCart.delete('/:id', async (req, res) => {
  const { id } = req.params

  /* 
    // FileSystem
    let deleteById = await carritos.deleteById(id)
    let rtaFinal = {}
        rtaFinal = {
    success: true,
    deleted: deleteById
    }
    res.json(rtaFinal)
    // FileSystem
    */

  // /*
  // Mongo
  // const deleteCarritosMongo = await carritosMongo.deleteById(id)
  // res.json(deleteCarritosMongo)
  // Mongo
  // */

  /*
  // Firebase
  const DELETEcarritosFirebase = await carritosFirebase.deleteById(id)
  res.json(DELETEcarritosFirebase)
  // Firebase
  */
})

// ROUTES

// Ruta Por default
apiCart.all('*', (req, res, next) => {
  res.status(404).json({
    error: '404',
    descripcion: `Not found ${req.url} with method ${req.method} autorize`,
  })
})

module.exports = apiCart
