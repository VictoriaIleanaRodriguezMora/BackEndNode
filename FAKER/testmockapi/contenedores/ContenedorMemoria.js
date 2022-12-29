import { generarUsuario } from "../utils/generadorDeUsuarios.js";

class ContenedorMemoria {
  constructor() {
    this.items = [];
  }
  guardar(nuevoUsuario) {
    this.items.push(nuevoUsuario);
    return this.items[this.items.length - 1];
  }
  getAll() {
    return this.items;
  }
  getOne(id) {
    const found = this.items.find((item) => item.id == id);
    if (!found) {
      throw new Error("Error al listar: elemento no encontrado");
    } else {
      return found;
    }
  }
}

export default ContenedorMemoria;
