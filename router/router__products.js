const express = require('express')
const products__router = express.Router()

// LOG4JS 
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

// --------- DAOS ---------
const { DAO__Prods } = require("../PERSISTENCIA/DAOs/main__daos")
// --------- DAOS ---------

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/signup");
  }
}

function checkAdmin(req, res, next) {
  if (req.user.username == process.env.ADMIN) {
    next();
  } else {
    res.redirect("/products");
  }
}

// --------- ROUTES ---------
// GET http://localhost:5050/products/ - Return all the products
products__router.get('/', checkAuthentication, async (req, res) => {
  console.log(req.user);
  const prodsMongo = await DAO__Prods.getAll()
  const info = { req, res }
  res.render("./pages/ecommerce.ejs", { prodsMongo, info })

  logger.info('GET - Route: /products/')
})

// GET http://localhost:5050/products/stock - Return all the products
products__router.get('/stock', async (req, res) => {
  const prods = await DAO__Prods.getAll()
  res.json(prods)
})

// GET http://localhost:5050/products/confirmar-orden 
products__router.get('/confirmar-orden', async (req, res) => {
  res.render("pages/confirmar")
})

// GET http://localhost:5050/products/:id 
products__router.get('/:id', async (req, res) => {

  const { id } = req.params

  const cartProds = await DAO__Prods.getById(id)
  res.json(cartProds)

})

// GET http://localhost:5050/products/categoria/:categoria
products__router.get('/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params
  const categoriasMongo = await DAO__Prods.getByCategory(categoria)
  logger.info('GET - Route: /products/:id')
  res.json(categoriasMongo)
})

// GET  http://localhost:5050/products/add-one Ruta para admins. Para agregar un producto al stock
products__router.get('/add-one', checkAdmin, async (req, res, next) => {

  res.render("pages/products")
  logger.info("GET - Route: /products/add-one")

})

// POST - http://localhost:5050/products/add-one Ruta para admins. Para agregar un producto al stock
products__router.post('/add-one', checkAdmin, async (req, res, next) => {
  const { body } = await req
  if (body === {}) {
    throw new Error("El body es undefined")
  }

  const postProdsMongo = await DAO__Prods.save(body)
  logger.info("Element saved -->", postProdsMongo);
  res.json(postProdsMongo)

  logger.info('POST - Route: /products/add-one ')
})

// PUT /products/:id Receives an ID and update by ID.
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



// Ruta para error por default
products__router.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      error: res.status,
      descripcion: `Not found ${req.url} with method ${req.method} autorize`,
    })
})

module.exports = products__router
