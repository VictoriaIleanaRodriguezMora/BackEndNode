const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const session = require('express-session')
const MongoStore = require('connect-mongo')

// SOCKET.IO
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
const { websockets } = require("./SERVICIO/WEBSOCKETS/websockets")
// SOCKET.IO

const { DAO__Chat } = require("./PERSISTENCIA/DAOs/main__daos")
DAO__Chat.connectMDB()

//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 
const { passport__main, checkAuthentication, passport } = require("./SERVICIO/PASSPORT/middleware.passport")

//  CONTROLLER
const { GET_Products, GET_MainRoot } = require("./CONTROLLER/controllerAuth")

// ROUTER
const router__carritos = require("./router/router__carritos")
const router__products = require("./router/router__products")
const router__auth = require("./router/router__auth")
const router__chat = require("./router/router__chat")

// LOG4JS 
const { log4jsConfigure } = require("./SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()

// Inicializar passport. SI O SI, para poder registrarse con passport
passport__main()

class Initialize__App {
    constructor() {
        this.PORT = process.env.PORT || PORT;
        this.app = app
        this.httpServer = httpServer
        this.middlewares();
        this.routes();
        this.templatingEngine();
        this.websocket();
        this.main__routes()
    }
    main__routes() {
        this.app.get("/", checkAuthentication, GET_Products, (req, res) => {
            GET_MainRoot(req, res)
        })
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(express.static(__dirname + '../public'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.set('view engine', 'ejs')
        this.app.use(
            session({
                store: MongoStore.create({
                    mongoUrl: process.env.MONGO_ATLAS_URL_PROD,
                    mongoOptions: {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                    ttl: 3600,
                }),
                cookie: { maxAge: 100000 * 10 },

                secret: process.env.SECRET,
                resave: false,
                saveUninitialized: false,
            }),
        )

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes() {
        this.app.use('/products/', router__products)
        this.app.use('/auth/', router__auth)
        this.app.use('/chat/', router__chat)
        this.app.use('/api/carrito/', router__carritos)

    }

    websocket() {
        this.websockets = websockets(io)
    }

    templatingEngine() {
        this.app.use((express.static(__dirname + '/public')));
        this.app.set('view engine', 'ejs');
        this.app.set("views", "./views");
    }

    listen() {
        this.templatingEngine()
        this.middlewares()
        this.routes()
        this.httpServer.listen(this.PORT, () => logger.debug('SERVER ON http://localhost:' + PORT))
    }
}

module.exports = Initialize__App