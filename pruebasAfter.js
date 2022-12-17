// import ProductsDaoFileSystem from "./DAOS/Products/FileSystemProducts";
// import MessagesDaoFileSystem from "./DAOS/Messages/MessagesDaoFileSystem";
const ProductsDaoFileSystem = require("./DAOS/Products/FileSystemProducts");
const MessagesDaoFileSystem = require("./DAOS/Messages/FileSystemMessages");

const { config } = require("dotenv")
// googlear como manejar las variables de entorno

const InstanciasDaos = [
    {
        DaoName: ProductsDaoFileSystem,
        id: "FileSystem",
        description: "products"
    },
    {
        DaoName: MessagesDaoFileSystem,
        id: "FileSystem",
        description: "messages"

    }
]


// const Instancia = InstanciasDaos.filter((instancia) => instancia.id == process.env.INSTANCIA)

const resultado = {
    [InstanciasDaos[0].description]: InstanciasDaos[0].DaoName,
    [InstanciasDaos[1].description]: InstanciasDaos[1].DaoName,
}

module.exports = resultado