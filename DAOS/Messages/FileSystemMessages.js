const ContainerFileSystem = require("../MainContainers/ContainerFileSystem")



class MessagesDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("../.././DaosOutput./DaoMessages.json")
    }
    //  aquí, deberia ser particular, los campos con los que se crea el archivo
    // tamara instala dotenv
}


// export default MessagesDaoFileSystem
module.exports = MessagesDaoFileSystem