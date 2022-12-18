const ContainerFileSystem = require("../MainContainers/ContainerFileSystem")

class CarritosDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("./DAOSOutput/CarritosFileSystem.json")
    }
}


module.exports = CarritosDaoFileSystem