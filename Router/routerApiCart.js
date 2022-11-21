const express = require("express")
const apiCart = express.Router()

const IsAdmin = true

const ClassProds = require("../ClassContainer/ClassCart")
const cartFile = new ClassProds("./FileCart.json")

// console.log("ARCHIVO DESAFIO", cartFile);

// GET /api/carrito/ - Return all the products
apiCart.get("/", async (req, res) => {

    const syncProducts = await cartFile.getAll()

    res.json(syncProducts)

    console.log("GET - Route: /api/carrito/");

})

// GET /api/carrito/:id - Return the product specified by ID parameters
apiCart.get("/:id", async (req, res) => {
    const { id } = req.params

    const syncGetById = await cartFile.getById(id)

    res.json(syncGetById)

    console.log("GET - Route: /api/carrito/:id");
})

// GET /api/carrito/:id/products - Return the product specified by ID parameters
apiCart.get("/:id/products", async (req, res) => {
    const { id } = req.params

    const syncGetById = await cartFile.getByIdCart(id)

    res.json(syncGetById)

    console.log("GET - Route: /api/carrito/:id");
})

// POST - Receives and adds a product, and returns it with its assigned id.
// /api/carrito/
apiCart.post("/", async (req, res, next) => {
    const { body } = req
    const elementSaved = await cartFile.save(body)

    console.log(elementSaved);
    res.json(body)

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

    const elementSaved = await cartFile.saveById(body, id, name, price, stock, description)

    res.json(body)

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

        const updateById = await cartFile.updateById(id, title, price)

        res.json(updateById)
        console.log("PUT - Route /api/productos/:id ");
    })


// DELETE /api/carrito/:id Receives an ID and delete by ID.
apiCart.delete("/:id", async (req, res) => {
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