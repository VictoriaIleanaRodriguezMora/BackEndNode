import ProductsDaoFileSystem from "./DAOS/Products/FileSystemProducts";
import MessagesDaoFileSystem from "./DAOS/Messages/FileSystemMessages";

import { config } from "dotenv"
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


const Instancia = InstanciasDaos.filter((instancia) => instancia.id == process.env.INSTANCIA)