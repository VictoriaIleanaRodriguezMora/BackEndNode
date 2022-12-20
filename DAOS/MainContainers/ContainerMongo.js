const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
// import { connect } from 'mongoose';

class ContainerMongo {

    constructor(schemaToUse) {
        this.schemaToUse = schemaToUse // when you are going to execute this INSTANCE, you have to pass the path and the schemaToUse
    }

    async connectMDB() {
        try {
            const URL = "mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority"

            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })

        } catch (e) {
            console.log(e)
        }
    }

    async save(element) {
        try {
            await this.connectMDB()
            element["date"] = new Date().toLocaleString("en-GB")
            const elementMongoose = await this.schemaToUse.create(element)
            console.log("elementMongoose", elementMongoose["_id"]);
            const id = elementMongoose["_id"]
            mongoose.disconnect()
            console.log(id);
            return id
        } catch (error) {
            throw Error(error.message)
        }
    }

    async getAll() {
        try {
            await this.connectMDB()
            const element = await this.schemaToUse.find({})
            // mongoose.disconnect()
            // console.log(element);
            return element
        } catch (error) {
            throw Error(error.message)
        }
    }

    async getById(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            const num = Math.floor( Math.random() * 10000 )
            mongoose.disconnect()
            console.log(elementId);
            return elementId
        } catch (error) {
            throw Error(error.message)
        }
    }

    async getByIdCart(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            mongoose.disconnect()
            console.log(elementId);
            return elementId
        } catch (error) {
            throw Error(error.message)
        }
    }

    async updateById(id, toChange) {
        try {
            await this.connectMDB()

            const elementToChange = await this.schemaToUse.updateOne({ _id: id }, { $set: toChange })
 

            mongoose.disconnect()
            console.log("elementToChange", elementToChange);
            return elementToChange
        } catch (error) {
            throw Error(error.message)
        }
    }

    async deleteById(id) {
        try {
            await this.connectMDB()
            const deleted = await this.schemaToUse.deleteOne({ _id: id })
            mongoose.disconnect()
            console.log("deleted", deleted);
            return deleted
        } catch (error) {
            throw Error(error.message)
        }
    }
}

module.exports = ContainerMongo