const express = require("express")
const apiProducts = express.Router()
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')

const IsAdmin = true


// --------- DAOS --------- 
// FileSystem
const { ProductsDaoFileSystem } = require(".././DAOS/mainDaos.js")
const productsFileSystem = new ProductsDaoFileSystem()

// Mongo 
const { ProductsDaoMongo } = require(".././DAOS/mainDaos.js")
const modelProduct = require("../models/schemaProds.js")
const productsMongo = new ProductsDaoMongo(modelProduct)
// --------- DAOS --------- 

// ----- toProve ----- 
const fileSystemObj = { title: "Transportador", price: 540, thumbnail: "hhool-256.png" }

const mongoObj = ({ title: "Transportador", price: 540, thumbnail: "hhool-256.png" })
// ----- toProve ----- 

// productsMongo.save(mongoObj) // 1
// productsMongo.getAll() // 1
// productsMongo.getById("63a0f0af6892d0baf2af85bf") // 1

// --------- ROUTES --------- 

// GET /api/products/ - Return all the products
apiProducts.get("/", async (req, res) => {

    /* 
    // FileSystem
    const syncProducts = await productsFileSystem.getAll()
    res.json(syncProducts)
    // FileSystem
    */

    // 
    // Mongo
    const prodsMongo = await productsMongo.getAll()
    console.log(prodsMongo);
    res.json(prodsMongo)
    // Mongo
    // 

    console.log("GET - Route: /api/products/");

})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get("/:id", async (req, res) => {
    const { id } = req.params
    /* 
   // FileSystem
   const synGetById = await productsFileSystem.getById(id)
   res.json(synGetById)
   // FileSystem
   */

    // /*
    // Mongo
    const prodsMongo = await productsMongo.getById(id)
    console.log(prodsMongo);
    res.json(prodsMongo)
    // Mongo
    // */

    console.log("GET - Route: /api/products/:id");

})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
apiProducts.post("/", async (req, res, next) => {
    const { body } = req

    /* 
    // FileSystem
    const elementFileSystem = await productsFileSystem.save(body)
    console.log("elementFileSystem", elementFileSystem);
    res.json(body)
    // FileSystem
    */

    // /*
    // Mongo
    const postProdsMongo = await productsMongo.save(body)
    res.json(postProdsMongo)
    // Mongo
    // */


    console.log("POST - Route: /api/products/:id");
    console.log("Element saved -->", postProds);
})


// PUT /api/products/:id Receives an ID and update by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiProducts.put("/:id", async (req, res, next) => {

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
        const updateById = await productsFileSystem.updateById(id, title, price)
        res.json(updateById)
        // FileSystem
        */


        // /*
        // Mongo
        const postProdsMongo = await productsMongo.updateById(id, title, price)
        console.log("postProdsMongo", postProdsMongo);
        res.json(postProdsMongo)
        // Mongo
        // */

        console.log("PUT - Route /api/productsFileSystem/:id ");
    })


// DELETE /api/products/:id Receives an ID and delete by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiProducts.delete("/:id", async (req, res, next) => {

    if (!IsAdmin) {
        console.log("Not autorize page");
        res.json({ error: "Not autorize page" })
    } else {
        next();
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
        const deleteProdsMongo = await productsMongo.deleteById(id)
        res.json(deleteProdsMongo)
        // Mongo
        */

        
    })

// --------- ROUTES --------- 

// Ruta Por default
apiProducts.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = apiProducts