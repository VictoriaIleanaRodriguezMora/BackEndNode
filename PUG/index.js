const express = require("express")
const app = express()
const PORT = 8000
const apiProducts = express.Router()


// CONFIG 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use("/api/products/", require("../router/routerPUGApiProducts")) // Routes api/products
// VIEWS CONFIG 
// Configuracion especifica de PUG
app.set('view engine', 'pug');
app.set('views', './views');
// Configuracion especifica de PUG
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
        motor: "PUG",
        products: "/api/products/",
        randomProduct: "/randomProduct",
        formProduct: "/formProducts"
    }
    res.json(principalRoute)
    next()
})

//  GET RUTA PARA EL POST
app.get("/formProducts", (req, res) => {
    console.log("Route form");
    // res.sendFile(__dirname + "/public/index.html")
    res.render('form.pug', { title: 'PUG Listado de PRODUCTOS' });
})

// ROUTES
