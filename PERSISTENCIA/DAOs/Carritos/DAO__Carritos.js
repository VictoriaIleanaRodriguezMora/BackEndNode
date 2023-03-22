const { DAO__Mongo } = require("../Containers/DAO__Mongo")

// LOG4JS 
const { log4jsConfigure } = require("../../../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

class CarritosDAOMongo extends DAO__Mongo {

}


module.exports = { CarritosDAOMongo }