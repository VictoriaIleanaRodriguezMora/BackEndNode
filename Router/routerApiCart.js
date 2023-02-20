const express = require("express")
const apiCart = express.Router()

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

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
// FileSystem
const { CarritosDaoFileSystem } = require(".././DAOS/mainDaos.js")
const carritos = new CarritosDaoFileSystem()

// Mongo */
const { CarritosDaoMongo } = require(".././DAOS/mainDaos.js")
const modelCarrito = require("../models/schemaCarritos.js")
const carritosMongo = new CarritosDaoMongo(modelCarrito)

// Firebase

const { CarritosDaoFirebase } = require(".././DAOS/mainDaos.js")
const carritosFirebase = new CarritosDaoFirebase("carritos")
// carritosFirebase.save(toProve)
// carritosFirebase.getByIdCart("7d5b517d-5e7f-45df-9a48-6568d0973aea")
// DAOS

// carritos.getAll()       
// GET /api/carrito/ - Return all the products
apiCart.get("/", async (req, res) => {

    /* 
    // FileSystem
    const syncProducts = await carritos.getAll()
    res.json(syncProducts)
    // FileSystem
    */

    // /*  
    // Mongo
    const cartMongo = await carritosMongo.getAll()
    logger.info(cartMongo);
    res.json(cartMongo)
    // Mongo
    // */

    /*
    // Firebase
    const GETprodsFirebase = await carritosFirebase.getAll()
    res.json(GETprodsFirebase)
    // Firebase
    */

    logger.info({ GET: "localhost:5050/api/carrito/" });

})

// GET /api/carrito/:id - Return the product specified by ID parameters
apiCart.get("/:id", async (req, res) => {
    const { id } = req.params

    /*
    // FileSystem
    const syncGetById = await carritos.getById(id)
    res.json(syncGetById)

    // FileSystem
    */

    /*  
    // Mongo
    const cartMongo = await carritosMongo.getById(id)
    logger.info(cartMongo);
    res.json(cartMongo)
    // Mongo
    */

    // /*
    // Firebase
    const GETcarritosFirebase = await carritosFirebase.getById(id)
    res.json(GETcarritosFirebase)
    // Firebase
    //  */

    logger.info({ GET: "localhost:5050/api/carrito/:id" });
})

// GET /api/carrito/:id/products - Return the product specified by ID parameters
apiCart.get("/:id/products", async (req, res) => {
    const { id } = req.params

    /*
    // FileSystem
    const syncGetById = await carritos.getByIdCart(id)
    res.json(syncGetById)
    // FileSystem
    */

    /*  
    // Mongo
    const GETcartMongo = await carritosMongo.getByIdCart(id)
    logger.info(GETcartMongo);
    res.json(GETcartMongo)
    // Mongo
    */

    logger.info({ GET: "localhost:5050/api/carrito/:id/products" });
})

// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/
apiCart.post("/", async (req, res, next) => {
    const { body } = req

    /* 
    // FileSystem
    const elementSaved = await carritos.save(body)
    logger.info(elementSaved);
    res.json(body)
    logger.info("Element saved --> ", elementSaved);
    // FileSystem
    */

    // /*  
    // Mongo
    const POSTCarritosMongo = await carritosMongo.save(body)
    res.json(POSTCarritosMongo)
    logger.info("POSTCarritosMongo", POSTCarritosMongo);
    // Mongo
    // */

      /*
    // Firebase
    const POSTcarritosFirebase = await carritosFirebase.save(body)
    res.json(POSTcarritosFirebase)
    // Firebase
    */

    logger.info("POST - Route: /api/carrito/:id");
})


// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/:id/products
apiCart.post("/:id/products", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { title } = body
    const { price } = body


    /* 
    // FileSystem
    const cartFileSsytem = await carritos.updateById(body, id, title, price)
    res.json(cartFileSsytem)
    logger.info("Element saved --> ", cartFileSsytem);
    // FileSystem
    */

    // /*  
    // Mongo
    const cartMongo = await carritosMongo.saveCart(id, title, price)
    res.json(cartMongo)
    // Mongo
    // */

    /* Firebase prods */


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

        /* 
        // FileSystem
        const updateById = await carritos.updateById(id, title, price)
        res.json(updateById)
        // FileSystem
        */


        /*  
        // Mongo
        const PUTCartsMongo = await carritosMongo.updateByIdCart(id, title, price)
        logger.info("PUTCartsMongo", PUTCartsMongo);
        res.json(PUTCartsMongo)
        // Mongo
        */

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

    // /*
    // Firebase
    const DELETEcarritosFirebase = await carritosFirebase.deleteById(id)
    res.json(DELETEcarritosFirebase)
    // Firebase
    // */

})

// ROUTES



// Ruta Por default
apiCart.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = apiCart