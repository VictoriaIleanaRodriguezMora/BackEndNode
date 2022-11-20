const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000

// SOCKET.IO
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
// SOCKET.IO

httpServer.listen(process.env.PORT || PORT, () => console.log("SERVER ON", PORT));

// Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Configuraciones

// Principal Route
app.get('/', (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
});
// Principal Route

//  GET RUTA PARA EL POST
app.get("/form", (req, res) => {
    console.log("Route form");
    res.sendFile(__dirname + "/public/index.html")
})

// ROUTER
app.use("/api/products/", require("./Router/routerApiProducts"));

app.use("/api/carrito/", require("./Router/routerApiCart"))
// ROUTER

// Ruta Por default
app.all("*", (req, res, next) => {
    res.status(404).json({ "error": "404", "descripcion": `ruta ${req.url} método ${req.method} no autorizada` })
})


// Files initialization

const Container = require("./ClassContainer/ClassProds")

const chatFile = new Container("./FileChat.json")
const prodFile = new Container("./FileProd.json")


const ClassCart = require("./ClassContainer/ClassCart")
const ClassCartFile = new ClassCart("./FileCart.json")

const Carrito = {
    id: "",
    timestamp: "",
    productos: {
        codigo: "xxx",
        descripcion: "Descripcion",
        foto: "https://",
        nombre: "libro",
        precio: 200,
        stock: 10,
        timestamp: "",
        id: ""

    }
}

// ClassCartFile.save(Carrito)

// Files initialization


// WEBSOCKETS
io.on("connection", async (socket) => {

    console.log(`Servidor: Usuario conectado \nSocketUser ID: ${socket.id}`) // Cuando el usuario se conecta

    // Products Global Functionalities 
    const syncProducts = await prodFile.getAll()
    io.sockets.emit("products", syncProducts) // Me faltaba esta linea, para que funcione.  Ahora si llega la data del back al front

    // Products Socket Channel 
    socket.on("products", (dataProds) => {
        prodFile.save(dataProds) // Keep in the file, the data captured by the front. The Object sent inserted by from.
        io.sockets.emit("products", syncProducts)
    })
    // Products Socket  Channel 


    // Chat Global Functionalities

    const chatFileSync = await chatFile.getAll()
    io.sockets.emit("chatPage", chatFileSync)

    socket.on("chatPage", (dataChat) => {
        chatFile.save(dataChat)
        io.sockets.emit("chatPage", chatFileSync)
    })

    // Chat Global Functionalities

})
// WEBSOCKETS

