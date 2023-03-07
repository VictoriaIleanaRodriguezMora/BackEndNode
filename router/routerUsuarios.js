const express = require("express")
const { getUsuariosController } = require("../controllerr/controller")

const usuariosRouter = express.Router()

usuariosRouter.get("/usuarios", getUsuariosController)

module.exports =  usuariosRouter 