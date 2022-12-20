const express = require("express")
const apiCart = express.Router()

const IsAdmin = true

// DAOS
// FileSystem
const { CarritosDaoFileSystem } = require(".././DAOS/mainDaos.js")
const carritos = new CarritosDaoFileSystem()

// Mongo */
const { CarritosDaoMongo } = require(".././DAOS/mainDaos.js")
const modelCarrito = require("../models/schemaCarritos.js")
const carritosMongo = new CarritosDaoMongo(modelCarrito)
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

    // Mongo
    // */

    console.log("GET - Route: /api/carrito/");

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

    // /*  
    // Mongo

    // Mongo
    // */


    console.log("GET - Route: /api/carrito/:id");
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

    // /*  
    // Mongo

    // Mongo
    // */

    console.log("GET - Route: /api/carrito/:id");
})

// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/
apiCart.post("/", async (req, res, next) => {
    const { body } = req

    /* 
    // FileSystem
    const elementSaved = await carritos.save(body)
    console.log(elementSaved);
    res.json(body)
    // FileSystem
    */

    // /*  
    // Mongo

    // Mongo
    // */

    console.log("POST - Route: /api/carrito/:id");
    console.log("Element saved --> ", elementSaved);
})


// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/:id/products
apiCart.post("/:id/products", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { name } = body
    const { price } = body
    const { stock } = body
    const { description } = body

    /* 
    // FileSystem
    const elementSaved = await carritos.updateById(body, id, name, price, stock, description)
    res.json(body)
    // FileSystem
    */

    // /*  
    // Mongo

    // Mongo
    // */

    console.log("POST - Route: /api/carrito/:id");
    console.log("Element saved --> ", elementSaved);
})

// PUT /api/carrito/:id Receives an ID and update by ID.
// http://localhost:8000/api/carrito/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiCart.put("/:id", async (req, res, next) => {

    if (!IsAdmin) {
        console.log("Not autorize page");
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


        // /*  
        // Mongo

        // Mongo
        // */

        console.log("PUT - Route /api/productos/:id ");
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

    // Mongo
    // */

})

// ROUTES



// Ruta Por default
apiCart.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = apiCart