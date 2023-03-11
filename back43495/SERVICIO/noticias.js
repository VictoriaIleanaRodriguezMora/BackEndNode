const config = require("../config.js");
const NoticiasFactoryDAO = require("../model/DAOs/noticiasFactory.js");
const Noticias = require("../model/models/noticias.js");
class ApiNoticias {
  constructor() {
    this.noticiasDAO = NoticiasFactoryDAO.get(config.TIPO_PERSISTENCIA);
  }
  async obtenerNoticias(id) {
    return await this.noticiasDAO.obtenerNoticias(id);
  }
  async guardarNoticia(noticia) {
    ApiNoticias.asegurarNoticiaValida(noticia, true);
    return await this.noticiasDAO.guardarNoticia(noticia);
  }
  async actualizarNoticia(id, noticia) {
    ApiNoticias.asegurarNoticiaValida(noticia, false);
    return await this.noticiasDAO.actualizarNoticia(id, noticia);
  }
  async borrarNoticia(id) {
    return await this.noticiasDAO.borrarNoticia(id);
  }
  static asegurarNoticiaValida(noticia, requerido) {
    try {
      Noticias.validar(noticia, requerido);
    } catch (error) {
      throw new Error(
        "la noticia posee un formato json invalido o faltan datos: " +
        error.details[0].message
      );
    }
  }
}
module.exports = ApiNoticias;
