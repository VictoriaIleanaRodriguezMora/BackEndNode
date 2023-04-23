const express = require("express")
const cartRouter = express.Router()

// LOG4JS 
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

// DAOS
const { DAO__Orders } = require("../PERSISTENCIA/DAOs/main__daos")
// DAOS

// GET /api/carrito/ 
cartRouter.get("/", async (req, res) => {
    const cartMongo = await DAO__Orders.getAll()
    logger.info(cartMongo);
    res.json(cartMongo)
    logger.info({ GET: "localhost:5050/api/carrito/" });

})

// GET /api/carrito/:id 
cartRouter.get("/:id", async (req, res) => {
    const { id } = req.params

    const cartMongo = await DAO__Orders.getById(id)
    logger.info(cartMongo);
    res.json(cartMongo)


    logger.info({ GET: "localhost:5050/api/carrito/:id" });
})

// POST 
// /api/carrito/
cartRouter.post("/", async (req, res, next) => {
    const { body } = req

    const POSTDAO__Orders = await DAO__Orders.save(body)
    res.json(POSTDAO__Orders)
    logger.info("POSTDAO__Orders", POSTDAO__Orders);

    logger.info("POST - Route: /api/carrito/:id");
})


// POST - 
// /api/carrito/:id/products
cartRouter.post("/:id/products", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { title } = body
    const { price } = body

    const cartMongo = await DAO__Orders.saveCart(id, title, price)
    res.json(cartMongo)

    logger.info("POST - Route: /api/carrito/:id");
})

// PUT /api/carrito/:id Receives an ID and update by ID.
// http://localhost:8000/api/carrito/4c45bf45-d5ef-4d97-8332-592979ac63cd
cartRouter.put("/:id", async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    const { title } = body
    const { price } = body

    /*   const PUTcarritosFirebase = await carritosFirebase.updateById(id, title, price) // I can improve this one
      res.json(PUTcarritosFirebase) */

    logger.info("PUT - Route /api/productos/:id ");
})


// DELETE /api/carrito/:id Receives an ID and delete by ID.
cartRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deleteDAO__Orders = await DAO__Orders.deleteById(id)
    res.json(deleteDAO__Orders)


})


// Ruta Por default
cartRouter.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = cartRouter