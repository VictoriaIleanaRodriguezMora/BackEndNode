const express = require('express')
const apiProducts = express.Router()

/* LOG4JS */
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */


// --------- DAOS ---------
const { DAO__Prods } = require("../PERSISTENCIA/DAOs/main__daos")
// --------- DAOS ---------

// --------- ROUTES ---------

// GET /api/products/ - Return all the products
apiProducts.get('/', async (req, res) => {

  const prodsMongo = await DAO__Prods.getAll()
  logger.info(prodsMongo);
  res.json(prodsMongo)


  logger.info('GET - Route: /api/products/')
})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get('/:id', async (req, res) => {
  const { id } = req.params


  const prodsMongo = await DAO__Prods.getById(id)
  logger.info(prodsMongo);
  console.log("###############################", req.params);//id
  
  logger.info('GET - Route: /api/products/:id')
  return res.json(prodsMongo)
})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
apiProducts.post('/', async (req, res, next) => {
  const { body } = req

  // los log por test salen undefined
  const postProdsMongo = await DAO__Prods.save(body)
  logger.info("Element saved -->", postProdsMongo);
  res.json(postProdsMongo)

  logger.info('POST - Route: /api/products/:id')
})

// PUT /api/products/:id Receives an ID and update by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiProducts.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const { title } = body
  const { price } = body

  const PUTProdsMongo = await DAO__Prods.updateById(id, title, price)
  logger.info("PUTProdsMongo", PUTProdsMongo);
  res.json(PUTProdsMongo)

  logger.info('PUT - Route /api/productsFileSystem/:id ')
})

// DELETE /api/products/:id Receives an ID and delete by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiProducts.delete(async (req, res) => {
  console.log("######################", id);
  const { id } = req.params

  const deleteProdsMongo = await DAO__Prods.deleteById(id)
  res.json(deleteProdsMongo)

})

// --------- ROUTES ---------

// Ruta Por default
apiProducts.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      error: res.status,
      descripcion: `Not found ${req.url} with method ${req.method} autorize`,
    })
})

module.exports = apiProducts
