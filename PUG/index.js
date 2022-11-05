const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const express = require("express")
const app = express()
const PORT = 8000

// SERVER
const server = app.listen(PORT, () => {
    console.log(`Puerto ${server.address().port} 43495`);
})
// SERVER

// CONFIG 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use("/api/products/", require("../router/routerPUGApiProducts")) // Routes api/products
// VIEWS CONFIG 
// Configuracion especifica de HBS
app.set('view engine', 'hbs');
app.set('views', './views');
// Configuracion especifica de HBS
// CONFIG 

// ROUTES
app.get("/", (req, res, next) => {
    console.log("Principal Route");
    const principalRoute = {
        PORT: 8000,
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
    res.render('form.pug', { title: 'Listado de PRODUCTOS' });
})

// ROUTES




