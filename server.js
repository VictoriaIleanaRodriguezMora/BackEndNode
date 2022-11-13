const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000
const apiProducts = express.Router()

// SOCKET
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(process.env.PORT || PORT, () => console.log("SERVER ON", PORT));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



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
// CLASS


const Escuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1
}

const prodFile = new Container("./ejercicio.json")
// prodFile.save(Escuadra)
// prodFile.getById("67a4635f-b9c7-4f9e-a97f-7c1ffffa41ea")
// prodFile.getById("99949c2e-811d-4986-84d7-456959c5b3eb")
// prodFile.getAll()
// prodFile.deleteById("6f179a05-0840-467f-bd57-4499021839f0")
// prodFile.deleteAll()
const chatFile = new Container("./chatFile.json")
// chatFile.save(Escuadra)

// ROUTES
app.get('/', (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
});

app.use("/api/products/", apiProducts)

//  GET RUTA PARA EL POST
app.get("/form", (req, res) => {
    console.log("Route form");
    res.sendFile(__dirname + "/public/index.html")
})

// GET /api/products/ - Return all the products
apiProducts.get("/", async (req, res, next) => {

    const syncProducts = await prodFile.getAll()

    res.json(syncProducts)

    console.log("GET - Route: /api/products/");
    next()
})

// GET /api/products/:id - Return the product specified by ID parameters
apiProducts.get("/:id", async (req, res, next) => {
    const { id } = req.params

    const synGetById = await prodFile.getById(id)

    res.json(synGetById)

    console.log("GET - Route: /api/products/:id");
    next()
})

// POST - Receives and adds a product, and returns it with its assigned id.
apiProducts.post("/", async (req, res, next) => {
    const { body } = req
    const elementSaved = await prodFile.save(body)

    console.log(elementSaved);
    res.json(body)

    console.log("POST - Route: /api/products/:id");
    console.log("Element saved --> ", elementSaved);
})

// PUT /api/products/:id Receives an ID and update by ID.
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd
apiProducts.put("/:id", async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    const { title } = body
    const { price } = body

    const updateById = await prodFile.updateById(id, title, price)

    res.json(updateById)
    console.log("PUT - Route /api/productos/:id ");
})

// DELETE /api/products/:id Receives an ID and delete by ID.
// http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd

apiProducts.delete("/:id", async (req, res) => {
    const { id } = req.params

    let deleteById = await prodFile.deleteById(id)
    let rtaFinal = {}

    rtaFinal = {
        success: true,
        deleted: deleteById
    }
    res.json(rtaFinal)


})



io.on("connection", async (socket) => {

    console.log(`Servidor: Usuario conectado \nSocketUser ID: ${socket.id}`) // Cuando el usuario se conecta

    // Products Global Functionalities 
    const syncProducts = await prodFile.getAll()
    io.sockets.emit("products", syncProducts) // Me faltaba esta linea, para que funcione.  Ahora si llega la data del back al front

    // Products Socket Channel 
    socket.on("products", (dataProds) => {
        prodFile.save(dataProds) // Keep in the file, the data captured by the front. The Object sent inserted by from.
        io.sockets.emit("products", syncProducts)
    })
    // Products Socket  Channel 


    // Chat Global Functionalities

    const chatFileSync = await chatFile.getAll()
    io.sockets.emit("chatPage", chatFileSync)

    socket.on("chatPage", (dataChat) => {
        chatFile.save(dataChat)
        io.sockets.emit("chatPage", chatFileSync)
    })


})

