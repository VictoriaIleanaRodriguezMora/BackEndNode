const { DAO__Mongo } = require("../Containers/DAO__Mongo")

// LOG4JS 
const { log4jsConfigure } = require("../../../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

class ProductsDaoMongo extends DAO__Mongo {
    async getByCategory(category) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.find({ categoria: category })
            console.log("##################", elementId);
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getByIdCart", error)
        }
    }

}


module.exports = { ProductsDaoMongo }