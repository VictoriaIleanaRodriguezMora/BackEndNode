let DAO = null;
let MODO = process.argv[2]
const { DAO__Mongo } = require("../DAOs/Containers/DAO__Mongo")
const { DAO__Memoria } = require("../DAOs/Containers/DAO__Memoria")

/* fabrica, donde esta el new es la fabrica */
/* misma interfaz significa que  los metodos de cada clase se llamen igual, si hacen lo mismo, pq si no no funciona. El ESQUEMA, el nombre de los metodos, tiene que  se igual, aunque hagan cosas distintas */
/* ideal seria por env o consola */
/* quizas sirve un switch acá */
if (MODO == "prod") {
    DAO = new DAO__Mongo()
} else if (MODO == "dev") {
    DAO = new DAO__Memoria()
} else{
    throw 'No se indicó que DAO fabricar'
}

module.exports = { DAO }

/* seria mejor que venga por env o port consola */