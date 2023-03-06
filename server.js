
const express = require('express')
const app = express()
const PORT = 4560
const mongoose = require("mongoose")
const { connect } = require("mongoose")
const { UsuarioModel } = require("./models/schemaUsuariosApp")

async function connectMDB() {
    try {
        const URL = "mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority"
        console.log("MONGO conectado a FUSSI:fussi0117");
        return await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUniFiedTopology: true
        })

    } catch (e) {
        console.log(e)
    }
}
connectMDB()

const { usuariosRouter } = require("./router/routerUsuarios")
app.use("/api", usuariosRouter)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/usuarios`);
})