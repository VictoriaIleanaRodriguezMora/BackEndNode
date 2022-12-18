const ContainerFileSystem = require("../MainContainers/ContainerFileSystem")

class MessagesDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("./DAOSOutput/MessagesFileSystem.json")
    }

}


// export default MessagesDaoFileSystem
module.exports = MessagesDaoFileSystem