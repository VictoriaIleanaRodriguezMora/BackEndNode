const { options } = require("../options/options.js");
const knex = require("knex")(options);


knex.schema
    //I want to see the name (students), that creates here in the .then()
    .createTable("students", (table) => {
        table.increments("id").unique,
            table.string("name", 80),
            table.integer("price");
    })
    .then((res) => {
        //I want to see the name, that creates here in the then
        console.log(`Table ${this.table} created`); // This doesnt work
        console.log("RES", res);
    })
    .catch((err) => {
        console.log("Table Students ERROR", err);
        throw new Error(err);
    })
    .finally(() => {
        knex.destroy();
    });






