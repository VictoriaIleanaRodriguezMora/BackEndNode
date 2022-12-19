const ContainerFileSystem = require("../MainContainers/ContainerFileSystem")

class MessagesDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("./DAOSOutput/MessagesFileSystem.json")
    }

}

module.exports = MessagesDaoFileSystem