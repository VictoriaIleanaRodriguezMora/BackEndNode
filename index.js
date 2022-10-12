class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        const nombreYapellido = `${this.nombre} ${this.apellido}`
        console.log("getFullName", nombreYapellido);
        return nombreYapellido
    }
    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota)
        return this.mascotas
    }
    countMascotas() {
        const cantMascotas = this.mascotas.length
        console.log("countMascotas", cantMascotas);
        return cantMascotas
    }
    addBook(nombre, autor) {
        this.libros.push({ nombre: nombre, autor: autor })
    }
    getBookNames() {
        const libros = this.libros
        libros.forEach(element => {
            console.log("getBookNames", element.nombre);
        });
        return libros
    }


}

const usuarioAda = new Usuario("Ada", "Lovelace", [], [])
usuarioAda.getFullName()
usuarioAda.addMascota("Logan")
usuarioAda.countMascotas()
usuarioAda.addBook("The Hunger Games", "Suzanne Collins")
usuarioAda.getBookNames()

console.log(usuarioAda);