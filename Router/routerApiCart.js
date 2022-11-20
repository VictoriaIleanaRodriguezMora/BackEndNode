const express = require("express")
const apiCart = express.Router()

const IsAdmin = true

const ClassProds = require("../ClassContainer/ClassCart")
const cartFile = new ClassProds("./FileCart.json")

// console.log("ARCHIVO DESAFIO", cartFile);

// GET /api/products/ - Return all the products
apiCart.get("/", async (req, res) => {

    const syncProducts = await cartFile.getAll()

    res.json(syncProducts)

    console.log("GET - Route: /api/products/");

})

// GET /api/products/:id - Return the product specified by ID parameters
apiCart.get("/:id", async (req, res) => {
    const { id } = req.params
    console.log(id);

    const syncGetById = await cartFile.getById(id)

    console.log("syncGetById",syncGetById);

    res.json(syncGetById)

    console.log("GET - Route: /api/products/:id");
})

// POST - Receives and adds a product, and returns it with its assigned id.
// Just ADMIN
apiCart.post("/", async (req, res, next) => {

    if (!IsAdmin) {
        console.log("Not autorize page");
        res.json({ error: "Not autorize page" })
    } else {
        next();
    }

},
    async (req, res, next) => {
        const { body } = req
        const elementSaved = await cartFile.save(body)

        console.log(elementSaved);
        res.json(body)

        console.log("POST - Route: /api/products/:id");
        console.log("Element saved --> ", elementSaved);
    })


// PUT /api/products/:id Receives an ID and update by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
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

        const updateById = await cartFile.updateById(id, title, price)

        res.json(updateById)
        console.log("PUT - Route /api/productos/:id ");
    })


// DELETE /api/products/:id Receives an ID and delete by ID.
// Just ADMIN
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiCart.delete("/:id", async (req, res, next) => {

    if (!IsAdmin) {
        console.log("Not autorize page");
        res.json({ error: "Not autorize page" })
    } else {
        next();
    }

},

    async (req, res) => {
        const { id } = req.params

        let deleteById = await cartFile.deleteById(id)
        let rtaFinal = {}

        rtaFinal = {
            success: true,
            deleted: deleteById
        }
        res.json(rtaFinal)
    })

// ROUTES



// Ruta Por default
apiCart.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `Not found ${req.url} with method ${req.method} autorize` })
})

module.exports = apiCart