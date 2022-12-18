const ContainerFileSystem = require("../MainContainers/ContainerFileSystem")

class ProductsDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("./DAOSOutput/ProductsFileSystem.json")
    }
}


module.exports = ProductsDaoFileSystem