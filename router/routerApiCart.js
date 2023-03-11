const express = require("express")
const apiCart = express.Router()

/* LOG4JS */
const { log4jsConfigure } = require("../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

/* CONTROLLER */
const { } = require("../CONTROLLER/controllerAuth")
/* CONTROLLER */


const IsAdmin = true

// ----- toProve ----- 
const toProve = {
    timestamp: "",
    products:
    {
        code: "xxx",
        description: "Descripcion",
        photo: "https://",
        name: "libro",
        price: 200,
        stock: 10,
        timestamp: "",
        id: ""
    }
}
// ----- toProve ----- 

// DAOS
const { DAO__Cart } = require("../PERSISTENCIA/DAOs/main__daos")
// DAOS

// carritos.getAll()       
// GET /api/carrito/ - Return all the products
apiCart.get("/", async (req, res) => {
    const cartMongo = await DAO__Cart.getAll()
    logger.info(cartMongo);
    res.json(cartMongo)
    logger.info({ GET: "localhost:5050/api/carrito/" });

})

// GET /api/carrito/:id - Return the product specified by ID parameters
apiCart.get("/:id", async (req, res) => {
    const { id } = req.params

    const cartMongo = await DAO__Cart.getById(id)
    logger.info(cartMongo);
    res.json(cartMongo)


    logger.info({ GET: "localhost:5050/api/carrito/:id" });
})

// GET /api/carrito/:id/products - Return the product specified by ID parameters
apiCart.get("/:id/products", async (req, res) => {
    const { id } = req.params

    logger.info({ GET: "localhost:5050/api/carrito/:id/products" });
})

// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/
apiCart.post("/", async (req, res, next) => {
    const { body } = req


    // /*  
    // Mongo
    const POSTDAO__Cart = await DAO__Cart.save(body)
    res.json(POSTDAO__Cart)
    logger.info("POSTDAO__Cart", POSTDAO__Cart);
    // Mongo
    // */


    logger.info("POST - Route: /api/carrito/:id");
})


// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/:id/products
apiCart.post("/:id/products", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { title } = body
    const { price } = body



    // /*  
    // Mongo
    const cartMongo = await DAO__Cart.saveCart(id, title, price)
    res.json(cartMongo)
    // Mongo
    // */


    logger.info("POST - Route: /api/carrito/:id");
})

// PUT /api/carrito/:id Receives an ID and update by ID.
// http://localhost:8000/api/carrito/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiCart.put("/:id", async (req, res, next) => {

    if (!IsAdmin) {
        logger.info("Not autorize page");
        res.json({ error: "Not autorize page" })
    } else {
        next();
    }

},
    async (req, res, next) => {
        const { id } = req.params
        const { body } = req
        const { title } = body
        const { price } = body


        // /*
        // Firebase
        const PUTcarritosFirebase = await carritosFirebase.updateById(id, title, price) // I can improve this one
        res.json(PUTcarritosFirebase)
        // Firebase
        // */

        logger.info("PUT - Route /api/productos/:id ");
    })


// DELETE /api/carrito/:id Receives an ID and delete by ID.
apiCart.delete("/:id", async (req, res) => {
    const { id } = req.params



    // /*  
    // Mongo
    // const deleteDAO__Cart = await DAO__Cart.deleteById(id)
    // res.json(deleteDAO__Cart)
    // Mongo
    // */

})

// ROUTES



// Ruta Por default
apiCart.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = apiCart