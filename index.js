const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const express = require("express")
const app = express()
const PORT = 8000
const apiProducts = express.Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Puerto ${server.address().port} 43495`);
})

// CLASS
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
            let elementById
            parsedFile.forEach(element => {
                if (element.id == Id) {
                    // console.log(element);
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
    syncGetFile() {
        const file = fs.readFileSync(this.nameFile, "utf-8")
        let parsedFile = JSON.parse(file)
        return parsedFile
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
// archivoDesafio.getById("99949c2e-811d-4986-84d7-456959c5b3eb")
// archivoDesafio.getAll()
// archivoDesafio.deleteById("6f179a05-0840-467f-bd57-4499021839f0")
// archivoDesafio.deleteAll()
// CLASS


// ROUTES



app.use("/api/products/", apiProducts)

app.get("/", (req, res, next) => {
    console.log("Principal Route");
    const principalRoute = {
        PORT: 8000,
        products: "/api/products/",
        randomProduct: "/randomProduct"
    }
    res.json(principalRoute)
    next()
})

// Return all the products
apiProducts.get("/", async (req, res, next) => {

    const syncProducts = await archivoDesafio.getAll()

    res.json(syncProducts)

    console.log("Route: /api/products/");

})

// Return the product specified by ID
apiProducts.get("/:id", async (req, res, next) => {
    const { id } = req.params
    const synGetById = await archivoDesafio.getById(id)

    console.log(synGetById);

    res.json(synGetById)

    console.log("Route: /api/products/:id");
})