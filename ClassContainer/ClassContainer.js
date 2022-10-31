const fs = require("fs")
const { v4: uuidv4 } = require('uuid');


// CLASS
class Container {
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
            let elementById

            parsedFile.forEach(element => {
                if (element.id == Id) {
                    elementById = element
                    return element
                } else {
                    return null
                }
            });

            return elementById

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
            let elementToDelete
            parsedFile.forEach(element => {
                if (element.id == Id) {
                    // console.log(element);     
                    elementToDelete = element
                    return parsedFile
                } else {
                    return null
                }
            });
            positionObj = parsedFile.indexOf(elementToDelete)
            console.log(parsedFile[positionObj]);
            parsedFile.splice(positionObj, 1)


            await fs.promises.writeFile(this.nameFile, JSON.stringify(parsedFile), "utf-8")
            return parsedFile

        } catch (error) {
            console.log("getById()", error);
        }
    }

    async updateById(id, title, price) {
        const file = await fs.promises.readFile(this.nameFile, "utf-8")
        let parsedFile = await JSON.parse(file)

        let elementToUpdate
        let indexElement
        let finalElement

        parsedFile.forEach(element => {
            if (element.id == id) {
                elementToUpdate = element
                // console.log(element);
            }
        })
        indexElement = parsedFile.indexOf(elementToUpdate)
        console.log(parsedFile[indexElement]);
        finalElement = parsedFile[indexElement]

        if (title != undefined) {
            finalElement.title = title
            // console.log(finalElement);
        }

        if (price != undefined) {
            finalElement.price = price
            // console.log(finalElement);
        }

        await fs.promises.writeFile(this.nameFile, JSON.stringify(parsedFile), "utf-8")

        return finalElement
    }

    async deleteById(id) {
        const file = await fs.promises.readFile(this.nameFile, "utf-8")
        let parsedFile = await JSON.parse(file)

        let elementToDelete
        let indexElement
        let finalElementDelete
        let deleted

        parsedFile.forEach(element => {
            if (element.id == id) {
                elementToDelete = element
                // console.log(element);
            }
        })

        indexElement = parsedFile.indexOf(elementToDelete)
        finalElementDelete = parsedFile[indexElement]
        deleted = parsedFile.splice(indexElement, 1)
        console.log("DELETED", deleted);

        await fs.promises.writeFile(this.nameFile, JSON.stringify(parsedFile), "utf-8")

        return deleted
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)
            return parsedFile
        } catch (error) {
            console.log("getAll()", error);
        }
    }

    async deleteAll() {
        try {

            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)

            parsedFile.splice(0)

            await fs.promises.writeFile(this.nameFile, JSON.stringify(parsedFile), "utf-8")

            return parsedFile

        } catch (error) {
            console.log("deleteAll()", error);

        }
    }

}


const Escuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}
const Regla = {
    title: 'Regla',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}

const archivoDesafio = new Container("./exercise.json")
// archivoDesafio.save(Escuadra)
// archivoDesafio.getById("67a4635f-b9c7-4f9e-a97f-7c1ffffa41ea")
// archivoDesafio.getById("99949c2e-811d-4986-84d7-456959c5b3eb")
// archivoDesafio.getAll()
// archivoDesafio.deleteById("6f179a05-0840-467f-bd57-4499021839f0")
// archivoDesafio.deleteAll()
// CLASS

module.exports = archivoDesafio;