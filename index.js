const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;
    }

    async save(ObjectToInsert) {
        // Number - Receives an object, saves it to the file, returns the assigned id.
        
        try {
            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)

            ObjectToInsert["id"] = uuidv4();

            await fs.promises.writeFile(this.nameFile, JSON.stringify(parsedFile = [...parsedFile, ObjectToInsert]), "utf-8")

            console.log(ObjectToInsert["id"]);
            return ObjectToInsert["id"]
        } catch (error) {
            if (error.code === "ENOENT") {
                fs.writeFile(this.nameFile, "[]", (e) => {
                    console.log("writeFile in save", e);
                })
            }
            console.log("save", error);
        }
    }
}



const Escuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1
}
const Regla = {
    title: 'Regla',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1
}

const archivoDesafio = new Contenedor("./ejercicio.json")
archivoDesafio.save(Escuadra)
// archivoDesafio.save(Regla)
