const express = require('express')
const apiProducts = express.Router()
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')

const IsAdmin = true

// ----- toProve -----
const toProve = {
  title: 'Transportador',
  price: 540,
  thumbnail: 'hhool-256.png',
}
// ----- toProve -----

// --------- DAOS ---------
// FileSystem
const { ProductsDaoFileSystem } = require('.././DAOS/mainDaos.js')
const productsFileSystem = new ProductsDaoFileSystem()

// Mongo
const { ProductsDaoMongo } = require('.././DAOS/mainDaos.js')
const modelProduct = require('../models/schemaProds.js')
const productsMongo = new ProductsDaoMongo(modelProduct)

// Firebase
const { ProductsDaoFirebase } = require('.././DAOS/mainDaos.js')
const productsFirebase = new ProductsDaoFirebase('products')
// productsFirebase.save(toProve)

// --------- DAOS ---------

// --------- ROUTES ---------

// GET /api/products/ - Return all the products
apiProducts.get('/', async (req, res) => {
  /*
  // FileSystem
  const syncProducts = await productsFileSystem.getAll()
  console.log(' ----- FileSytem -----')
  res.json(syncProducts)
  // FileSystem
  */

  /*
  // Mongo
  const prodsMongo = await productsMongo.getAll()
  console.log(' ----- MONGO -----')
  res.json(prodsMongo)
  // Mongo
    */

  /*
  // Firebase
  const GETprodsFirebase = await productsFirebase.getAll()
  console.log(' ----- FIREBASE -----')
  res.json(GETprodsFirebase)
  // Firebase
  */

  console.log('GET - Route: /api/products/')
})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get('/:id', async (req, res) => {
  const { id } = req.params
  /*
  // FileSystem
  const synGetById = await productsFileSystem.getById(id)
  console.log(' ----- FileSytem -----')
  res.json(synGetById)
  //    FileSystem
  */

  /*
  // Mongo
  const prodsMongo = await productsMongo.getById(id)
  console.log(' ----- MONGO -----')
  res.json(prodsMongo)
  // Mongo
  */

  /*
    // Firebase
    const GETprodsFirebase = await productsFirebase.getById(id) // I can improve this one
    console.log(' ----- FIREBASE -----')
    res.json(GETprodsFirebase)
    // Firebase
    */

  console.log('GET - Route: /api/products/:id')
})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
apiProducts.post('/', async (req, res, next) => {
  const { body } = req

  /*
  // FileSystem
  const elementFileSystem = await productsFileSystem.save(body)
  console.log(' ----- FileSytem -----')
  res.json(body)
  // FileSystem
    */

  /*
  // Mongo
  const postProdsMongo = await productsMongo.save(body)
  console.log(' ----- MONGO -----')
  res.json(postProdsMongo)
  // Mongo
  */

  //   /*
  // Firebase
  const POSTprodsFirebase = await productsFirebase.save(body) // I can improve this one
  console.log(' ----- FIREBASE -----')
  res.json(POSTprodsFirebase)
  // Firebase
  //   */

  console.log('POST - Route: /api/products/:id')
})

// PUT /api/products/:id Receives an ID and update by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiProducts.put(
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
    const { description } = body
    const { price } = body

    /*
    // FileSystem
    const updateById = await productsFileSystem.updateById(id, description, price)
    console.log(" ------- FileSytem --------");
    res.json(updateById)
    // FileSystem
    */

    /*
    // Mongo
    const PUTProdsMongo = await productsMongo.updateById(id, description, price)
    console.log(' ----- MONGO -----')
    res.json(PUTProdsMongo)
    // Mongo
    */

    /*
    // Firebase
    const PUTprodsFirebase = await productsFirebase.updateById(
      id,
      description,
      price,
    ) // I can improve this one
    console.log(' ----- FIREBASE -----')
    res.json(PUTprodsFirebase)
    // Firebase
    */

    console.log('PUT - Route /api/productsFileSystem/:id ')
  },
)

// DELETE /api/products/:id Receives an ID and delete by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiProducts.delete(
  '/:id',
  async (req, res, next) => {
    if (!IsAdmin) {
      console.log('Not autorize page')
      res.json({ error: 'Not autorize page' })
    } else {
      next()
    }
  },
  async (req, res) => {
    const { id } = req.params

    /*
    // FileSystem
    let deleteById = await productsFileSystem.deleteById(id)
    let rtaFinal = {}
    rtaFinal = {
      success: true,
      deleted: deleteById,
    }
    console.log(' ----- FileSystem -----')
    res.json(rtaFinal)
    // FileSystem
    */

    /*
    // Mongo
    const deleteProdsMongo = await productsMongo.deleteById(id)
    console.log(' ----- MONGO -----')
    res.json(deleteProdsMongo)
    // Mongo
    */

    // /*
    // Firebase
    const DELETEprodsFirebase = await productsFirebase.deleteById(id)
    console.log(' ----- FIREBASE -----')
    res.json(DELETEprodsFirebase)
    // Firebase
    // */
  },
)

// --------- ROUTES ---------

// Ruta Por default
apiProducts.all('*', (req, res, next) => {
  res.status(404).json({
    error: '404',
    descripcion: `Not found ${req.url} with method ${req.method} autorize`,
  })
})

module.exports = apiProducts
