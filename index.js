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

    async getById(Id) {
        // ~ getById(Number): Object - Receives an id and returns the object with that id, or null if not present.
        try {

            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)

            parsedFile.forEach(element => {
                if (element.id == Id) {
                    console.log(element);
                    return element
                } else {
                    return null
                }
            });

        } catch (error) {
            console.log("getById()", error);
        }

    }

    async deleteById(Id) {
        // ~ deleteById(Number): void - Deletes the object with the searched id from the file.
        try {

            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)
            let positionObj

            parsedFile.forEach(element => {
                if (element.id == Id) {
                    positionObj = parsedFile.indexOf(element)
                    // parsedFile.slice(3, 1)
                    console.log(parsedFile[positionObj]);
                    parsedFile.splice(3, 1)
                    return element
                } else {
                    return null
                }
            });

            await fs.promises.writeFile(this.nameFile, JSON.stringify(parsedFile), "utf-8")
            
        } catch (error) {
            console.log("getById()", error);
        }
    }

    async getAll() {
        try {

            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)

            console.log(parsedFile);
            return parsedFile

        } catch (error) {
            console.log("getAll()", error);
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
// archivoDesafio.save(Escuadra)
// archivoDesafio.getById("67a4635f-b9c7-4f9e-a97f-7c1ffffa41ea")
// archivoDesafio.getById("b4b0ca3e-db22-45dc-9a03-5fcf260ef206")
// archivoDesafio.getAll()
archivoDesafio.deleteById("4681af52-699d-4c28-b748-30869345d4a5")

