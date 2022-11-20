const express = require("express")
const apiProducts = express.Router()

const IsAdmin = true

const Container = require("../ClassContainer/ClassContainer")

const prodFile = new Container("./ejercicio.json")
// console.log("ARCHIVO DESAFIO", prodFile);

// GET /api/products/ - Return all the products
apiProducts.get("/", async (req, res) => {

    const syncProducts = await prodFile.getAll()

    res.json(syncProducts)

    console.log("GET - Route: /api/products/");

})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get("/:id", async (req, res) => {
    const { id } = req.params

    const synGetById = await prodFile.getById(id)

    res.json(synGetById)

    console.log("GET - Route: /api/products/:id");
})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
apiProducts.post("/", async (req, res, next) => {

    if (!IsAdmin) {
        console.log("Not autorize page");
        res.json({ error: "Not autorize page" })
    } else {
        next();
    }

},
    async (req, res, next) => {
        const { body } = req
        const elementSaved = await prodFile.save(body)

        console.log(elementSaved);
        res.json(body)

        console.log("POST - Route: /api/products/:id");
        console.log("Element saved --> ", elementSaved);
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

        const updateById = await prodFile.updateById(id, title, price)

        res.json(updateById)
        console.log("PUT - Route /api/productos/:id ");
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

        let deleteById = await prodFile.deleteById(id)
        let rtaFinal = {}

        rtaFinal = {
            success: true,
            deleted: deleteById
        }
        res.json(rtaFinal)
    })

// ROUTES

// Ruta Por default
apiProducts.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = apiProducts