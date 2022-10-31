const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const express = require("express")
const app = express()
const PORT = 8000
const apiProducts = express.Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

// ROUTES
app.get("/", (req, res, next) => {
    console.log("Principal Route");
    const principalRoute = {
        PORT: 8000,
        products: "/api/products/",
        randomProduct: "/randomProduct"
    }
    res.json(principalRoute)
    next()
})


//  GET RUTA PARA EL POST
app.get("/form", (req, res) => {
    console.log("Route form");
    res.sendFile(__dirname + "/public/index.html")
})

app.use("/api/products/", require("../router/routerApiProducts"))
// ROUTES


// VIEWS CONFIG 
app.set('view engine', 'pug');
app.set('views', './views');


const server = app.listen(PORT, () => {
    console.log(`Puerto ${server.address().port} 43495`);
})




