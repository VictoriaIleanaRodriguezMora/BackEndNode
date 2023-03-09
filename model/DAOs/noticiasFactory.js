const NoticiasMemDAO = require("./noticiasMem.js");
const NoticiasFileDAO = require("./noticiasFile.js");
const NoticiasDBMongoDAO = require("./noticiasDBMongo.js");
class NoticiasFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return new NoticiasMemDAO();
      case "FILE":
        return new NoticiasFileDAO(process.cwd() + "/noticias.json");
      case "MONGO":
        return new NoticiasDBMongoDAO("mibase", "noticias");
        return new NoticiasMemDAO();
    }
  }
}
module.exports = NoticiasFactoryDAO;
