const express = require('express')
const apiProducts = express.Router()
const { v4: uuidv4 } = require('uuid')

/* LOG4JS */
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

const IsAdmin = true

// ----- toProve -----
const toProve = {
  title: 'Transportador',
  price: 540,
  thumbnail: 'hhool-256.png',
}
// ----- toProve -----

// --------- DAOS ---------
const { DAO__Prods } = require("../PERSISTENCIA/DAOs/main__daos")
// --------- DAOS ---------

// --------- ROUTES ---------

// GET /api/products/ - Return all the products
apiProducts.get('/', async (req, res) => {
  /* 
    // FileSystem
    const syncProducts = await productsFileSystem.getAll()
    res.json(syncProducts)
    // FileSystem
    */

  // /*  
  // Mongo
  const prodsMongo = await DAO__Prods.getAll()
  logger.info(prodsMongo);
  res.json(prodsMongo)
  // Mongo
  // */

  /*
  // Firebase
  const GETprodsFirebase = await productsFirebase.getAll()
  res.json(GETprodsFirebase)
  // Firebase
  */

  logger.info('GET - Route: /api/products/')
})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get('/:id', async (req, res) => {
  const { id } = req.params
  /* 
   // FileSystem
   const synGetById = await productsFileSystem.getById(id)
   res.json(synGetById)
   // FileSystem
   */

  /*
    // Mongo
    const prodsMongo = await DAO__Prods.getById(id)
    logger.info(prodsMongo);
    res.json(prodsMongo)
    // Mongo
    */

  /*
    // Firebase
    const GETprodsFirebase = await productsFirebase.getById(id) // I can improve this one
    res.json(GETprodsFirebase)
    // Firebase
    */

  logger.info('GET - Route: /api/products/:id')
})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
apiProducts.post('/', async (req, res, next) => {
  const { body } = req

  /* 
    // FileSystem
    const elementFileSystem = await productsFileSystem.save(body)
    logger.info("elementFileSystem", elementFileSystem);
    res.json(body)
    // FileSystem
    */

  /*
    // Mongo
    const postProdsMongo = await DAO__Prods.save(body)
    logger.info("Element saved -->", postProds);
    res.json(postProdsMongo)
    // Mongo
    */

  /*
    // Firebase
    const POSTprodsFirebase = await productsFirebase.save(body) // I can improve this one
    res.json(POSTprodsFirebase)
    // Firebase
    */

  logger.info('POST - Route: /api/products/:id')
})

// PUT /api/products/:id Receives an ID and update by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiProducts.put(
  '/:id',
  async (req, res, next) => {
    if (!IsAdmin) {
      logger.info('Not autorize page')
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
        const updateById = await productsFileSystem.updateById(id, title, price)
        res.json(updateById)
        // FileSystem
        */

    /*
        // Mongo
        const PUTProdsMongo = await DAO__Prods.updateById(id, title, price)
        logger.info("PUTProdsMongo", PUTProdsMongo);
        res.json(PUTProdsMongo)
        // Mongo
        */

    /*
        // Firebase
        const PUTprodsFirebase = await productsFirebase.updateById(id, title, price) // I can improve this one
        res.json(PUTprodsFirebase)
        // Firebase
        */

    logger.info('PUT - Route /api/productsFileSystem/:id ')
  },
)

// DELETE /api/products/:id Receives an ID and delete by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiProducts.delete(
  '/:id',
  async (req, res, next) => {
    if (!IsAdmin) {
      logger.info('Not autorize page')
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
            deleted: deleteById
        }
        res.json(rtaFinal)
        // FileSystem
        */

    /*
        // Mongo
        const deleteProdsMongo = await DAO__Prods.deleteById(id)
        res.json(deleteProdsMongo)
        // Mongo
        */

    /*
        // Firebase
        const DELETEprodsFirebase = await productsFirebase.deleteById(id)
        res.json(DELETEprodsFirebase)
        // Firebase
        */
  },
)

// --------- ROUTES ---------

// Ruta Por default
apiProducts.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      error: '404',
      descripcion: `Not found ${req.url} with method ${req.method} autorize`,
    })
})

module.exports = apiProducts
