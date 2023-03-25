const express = require('express')
const products__router = express.Router()

// LOG4JS 
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 


// --------- DAOS ---------
const { DAO__Prods } = require("../PERSISTENCIA/DAOs/main__daos")
// --------- DAOS ---------

// --------- ROUTES ---------

// GET /products/ - Return all the products
products__router.get('/', async (req, res) => {

  const prodsMongo = await DAO__Prods.getAll()
  logger.info(prodsMongo);
  // res.json(prodsMongo)
  res.render("./pages/products.ejs")

  logger.info('GET - Route: /products/')
})

// GET /products/categoria/:categoria
products__router.get('/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params
  console.log("CATEGORIA", categoria);
  const categoriasMongo = await DAO__Prods.getByCategory(categoria)
  // console.log(categoriasMongo);
  // logger.info(categoriasMongo);

  logger.info('GET - Route: /products/:id')
  res.json(categoriasMongo)
})

// GET /products/:id - Return the product specified by ID parameters
products__router.get('/:id', async (req, res) => {
  const { id } = req.params
  const prodsMongo = await DAO__Prods.getById(id)
  logger.info(prodsMongo);
  logger.info('GET - Route: /products/:id')
  res.json(prodsMongo)
})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
products__router.post('/', async (req, res, next) => {
  const { body } = await req
  if (body === {}) {
    throw new Error("El body es undefined")
  }
  console.log("body", body);

  const postProdsMongo = await DAO__Prods.save(body)
  logger.info("Element saved -->", postProdsMongo);
  res.json(postProdsMongo)

  logger.info('POST - Route: /products/')
})

// PUT /products/:id Receives an ID and update by ID.
// Just ADMIN
// http://localhost:8000/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
products__router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const { title } = body
  const { price } = body

  const PUTProdsMongo = await DAO__Prods.updateById(id, title, price)
  logger.info("PUTProdsMongo", PUTProdsMongo);
  res.json(PUTProdsMongo)

  logger.info('PUT - Route /productsFileSystem/:id ')
})

// DELETE /products/:id Receives an ID and delete by ID.
products__router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const deleteProdsMongo = await DAO__Prods.deleteById(id)
  res.json(deleteProdsMongo)

})

// --------- ROUTES ---------

// Ruta Por default
products__router.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      error: res.status,
      descripcion: `Not found ${req.url} with method ${req.method} autorize`,
    })
})

module.exports = products__router
