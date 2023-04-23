const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

class DAO__Memoria {
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

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.nameFile, "utf-8")
            let parsedFile = await JSON.parse(file)
            return parsedFile
        } catch (error) {
            console.log("getAll()", error);
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

    async getByUsername(name) {
        /*         try {
                    await this.connectMDB()
                    const elementId = await this.schemaToUse.find({ username: name })
                    // mongoose.disconnect()
                    logger.debug(elementId);
                    return elementId
                } catch (error) {
                    logger.debug("getByIdCart", error)
                } */
    }

    async getByGmail(gmail) {
        /*         try {
                    await this.connectMDB()
                    const elementId = await this.schemaToUse.find({ gmail: gmail })
                    // mongoose.disconnect()
                    logger.debug(elementId);
                    return elementId
                } catch (error) {
                    logger.debug("getByIdCart", error)
                } */
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

/*     async updateByIdCart(id, title, price) {
        try {
            await this.connectMDB()
            let elementToChange
            elementToChange["products"]["timestamp"] = new Date().toLocaleString("en-GB")

            if (title != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { title: title } });
                logger.debug(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { price: price } });
                logger.debug(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }

            // mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.debug("updateById: ", error)
        }
    } */

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


}

module.exports = { DAO__Memoria }