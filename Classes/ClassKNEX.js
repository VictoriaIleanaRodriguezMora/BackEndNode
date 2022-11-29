class PetitionKNEX {

    constructor(dbConfig, tableName) {
        this.dbConfig = require("knex")(dbConfig);
        this.tableName = tableName;
    }

    // createTableProds
    async createTableProds() {
        this.dbConfig.schema
            .createTable(this.tableName, (table) => {
                table.string("title", 15),
                    table.integer("price"),
                    table.string("thumbnail", 40),
                    table.increments("id").unique;
            })
            .then((res) => {
                //I want to see the name, that creates here in the then
                console.log(`Table ${this.tableName} CREATED`);
                console.log("RES", res);
            })
            .catch((err) => {
                console.log("Table Students ERROR", err);
            })
            .finally(() => {
                this.dbConfig.destroy();
            });
    }

    // Insert
    async insertProds(toInsert) {
        this.dbConfig(this.tableName).insert(toInsert)
            .then((res) => {
                //I want to see the name, that creates here in the then
                console.log(`INSERT in ${this.tableName} succesfully`);
                console.log("RES", res);
            })
            .catch((err) => {
                console.log(`Insert in ${this.tableName} ERROR`);
                console.log("ERROR", err);
            })
            .finally(() => {
                this.dbConfig.destroy();
            });
    }

    //  Select
    async select(toSelect) {
        this.dbConfig(this.tableName).select("*")
            .then((res) => {
                //I want to see the name, that creates here in the then
                console.log(`SELECT ${this.tableName} created`);
                console.log("RES", res);

                res.map((elem) => {
                    console.log(elem.title, elem.price, elem.thumbnail);
                })

            })
            .catch((err) => {
                console.log(`SELECT in ${this.tableName} ERROR`, err);
            })
            .finally(() => {
                this.dbConfig.destroy();
            });
    }

    // Update 
    async update(toUpdate){
        
    }

    // Delete

}

const Escuadra = {
    title: "libro",
    price: 1130,
    thumbnail: 'book',
}

const { optionsMySQL } = require("../options/options")
const productsDB = new PetitionKNEX(optionsMySQL, "products")
// productsDB.createTableProds() // This creates the table PRODUCTS
// productsDB.insertProds(Escuadra) // WORKS
productsDB.select()


