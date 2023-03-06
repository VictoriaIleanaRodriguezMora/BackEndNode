const mongoose = require("mongoose");
mongoose.set('strictQuery', false)


const UsuarioSchemaApp = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    gmail: { type: String, required: true, max: 100 },
    phone: { type: String, required: true, max: 100 },
    age: { type: String, required: true, max: 100 },
    adress: { type: String, required: true, max: 100 },
    avatar: { type: String, required: true, max: 100 },

},
    { versionKey: false },);

/* module.exports =  mongoose.model("usuarios_app", UsuarioSchemaApp); */
const UsuarioModel = mongoose.model("usuarios_app", UsuarioSchemaApp);



/* yo meteria la clase en la hoja de persistencia e importo los schemas
El DAO es la persistencia
 */


/* DAO Y Fabrica Abstracta */
class DAO__Mongo {
    async getUsuariosModel() {
        return await UsuarioModel.find({})
    }

}

let usuarios = [{ id: 45, admin: true }, { id: 87, admin: false }]
class DAO__Mem {
    async getUsuariosModel() {
        return usuarios
    }

}

const DAO__Final = new DAO__Mem()


module.exports = { UsuarioModel, DAO__Final }





/* 
mongoose ORM, te permite hacer de todo
si el modelo de mongoose  tiene que conectarse a 2 bases de datos, que haces?

si cambias de base de datos, que capa hay que tocar. 
El modelo

pero si no usas DAO, tenes que cambiar el servicio tambien
DEBERIA cambiar solo el modelo, pero sin DAO, no se puede

y la persistencia?
La ORM DEPENDE, de la bdd
Mongoose se instala aprte, y hay competencia de ORM, KNEX se instala aparte.
Pero firebase te da la ORM dentro de su bdd, no hay que instalar nada


El DAO nos ayuda a tener una propia forma de comunicarnos con la bdd.Son metodos propios que definimos. Pero mi DAO, pede,y debe usar la bdd. Es FLEXIBLE, pq se podria cambiar la bdd, solo cambiando la clase DAO

¿Cuando usas ORM  pq no  se puede cambiar la bdd? ¿Y pq con DAO sí?
Pq con la ORM particular de cada BD, la forma de hacer el CRUD es diferente. El get de MOngo no es el Get de Firebase. Entonces si cambia la bdd, solo hay que tocar la clase DAO


*/




/*

class ContainerMongo {

    constructor(schemaToUse) {
        this.schemaToUse = schemaToUse // when you are going to execute this INSTANCE, you have to pass the path and the schemaToUse
    }

    async connectMDB() {
        try {
            const URL = "mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority"
            logger.debug("MONGO conectado a FUSSI:fussi0117");
            return mongoose.connect(URL, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })

        } catch (e) {
            logger.debug(e)
        }
    }

    async save(element) {
        try {
            await this.connectMDB()
            element["date"] = new Date().toLocaleString("en-GB")
            const elementMongoose = await this.schemaToUse.create(element)
            logger.debug("elementMongoose", elementMongoose["_id"]);

            mongoose.disconnect()
            return elementMongoose["_id"]
        } catch (error) {
            logger.debug("save - Container Mongo:", error)
        }
    }

    async saveUser(element) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(element)
            logger.debug("elementMongoose", elementMongoose["_id"]);

            mongoose.disconnect()
            return elementMongoose["_id"]
        } catch (error) {
            logger.debug("save - Container Mongo:", error)
        }
    }

    async saveCart(element) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(element)
            element["date"] = new Date().toLocaleString("en-GB")
            element["products"]["date"] = new Date().toLocaleString("en-GB")
            logger.debug("element['products']", element["products"]);

            mongoose.disconnect()
            return elementMongoose["_id"]

        } catch (error) {
            logger.debug("save", error)
        }
    }

    async getAll() {
        try {

            await this.connectMDB()
            const element = await this.schemaToUse.find({})
            // logger.debug("getAll", element);

            // mongoose.disconnect() //ESTO ERA EL ERROR POOL
            return element

        } catch (error) {
            logger.debug("getAll", error)
        }
    }

    async getById(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            const num = Math.floor(Math.random() * 10000)
            mongoose.disconnect()
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getById", error)
        }
    }

    async getByIdCart(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            mongoose.disconnect()
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getByIdCart", error)
        }
    }

    async getByUsername(name) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.find({ username: name })
            mongoose.disconnect()
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getByIdCart", error)
        }
    }

    async updateById(id, title, price) {
        try {
            await this.connectMDB()
            let elementToChange

            if (title != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { title: title } });
                logger.debug(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { price: price } });
                logger.debug(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }

            mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.debug("updateById: ", error)
        }
    }

    async updateByIdCart(id, title, price) {
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

            mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.debug("updateById: ", error)
        }
    }

    async deleteById(id) {
        try {
            await this.connectMDB()
            const deleted = await this.schemaToUse.deleteOne({ _id: id })
            mongoose.disconnect()
            logger.debug("deleted", deleted);
            return deleted
        } catch (error) {
            logger.debug("deleteById()", error)
        }
    }

}

module.exports = ContainerMongo

*/