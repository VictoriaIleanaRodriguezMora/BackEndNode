const express = require("express");
const app = express()
const PORT = 8000
const apiProducts = express.Router()

// CONFIG 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use("/api/products/", require("../router/routerEJSApiProducts")) // Routes api/products
app.set('view engine', 'ejs');
// CONFIG 
// SERVER
const server = app.listen(PORT, () => {
    console.log(`Puerto ${server.address().port} 43495`);
})
// SERVER

// ROUTES

app.get("/", (req, res, next) => {
    console.log("Principal Route");
    const principalRoute = {
        PORT: 8000,
        motor: "EJS",
        products: "/api/products/",
        randomProduct: "/formProduct"
    }
    res.json(principalRoute)
    next()
})


//  GET RUTA PARA EL POST
app.get("/formProduct", (req, res) => {
    console.log("Route form");
    // res.sendFile(__dirname + "/public/index.html")
    res.render("pages/form.ejs", { title: "EJS FORM" })
})

// GET /api/products/ - Return all the products
apiProducts.get("/", async (req, res, next) => {

    const syncProducts = await archivoDesafio.getAll()
    console.log(syncProducts, "AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // res.json(syncProducts)
    res.render("pages/index.ejs", { title: 'EJS - Listado de productos', products: syncProducts })
    console.log("GET - Route: /api/products/");
    next()
})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get("/:id", async (req, res, next) => {
    const { id } = req.params

    const synGetById = await archivoDesafio.getById(id)

    res.json(synGetById)

    console.log("GET - Route: /api/products/:id");
    next()
})

// POST - Receives and adds a product, and returns it with its assigned id.
apiProducts.post("/", async (req, res, next) => {
    const { body } = req
    const elementSaved = await archivoDesafio.save(body)

    console.log(elementSaved);
    res.json(body)

    console.log("POST - Route: /api/products/:id");
    console.log("Element saved --> ", elementSaved);
})

// PUT /api/products/:id Receives an ID and update by ID.
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiProducts.put("/:id", async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    const { title } = body
    const { price } = body

    const updateById = await archivoDesafio.updateById(id, title, price)

    res.json(updateById)
    console.log("PUT - Route /api/productos/:id ");
})

// DELETE /api/products/:id Receives an ID and delete by ID.
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiProducts.delete("/:id", async (req, res) => {
    const { id } = req.params

    let deleteById = await archivoDesafio.deleteById(id)
    let rtaFinal = {}

    rtaFinal = {
        success: true,
        deleted: deleteById
    }
    res.json(rtaFinal)


})




