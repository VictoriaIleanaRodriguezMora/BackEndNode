const express = require("express")
const app = express()
const PORT = 8000
const { engine } = require('express-handlebars'); //HANDLEBARS

// SERVER
const server = app.listen(PORT, () => {
    console.log(`Puerto ${server.address().port} 43495`);
})
// SERVER

// CONFIG 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use("/api/products/", require("../router/routerHBSApiProducts")) // Routes api/products
// VIEWS CONFIG 
// Configuracion especifica de HBS
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + '/views/layouts',
      partialsDir: __dirname + '/views/partials',
    })
  );
// Configuracion especifica de HBS
// CONFIG 

// ROUTES
app.get("/", (req, res, next) => {
    console.log("Principal Route");
    const principalRoute = {
        PORT: 8000,
        motor: "HBS",
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
    res.render('form.hbs', { title: 'HBS Listado de PRODUCTOS ' });
})

// ROUTES




