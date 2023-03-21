const express = require('express')
const app = express()
const PORT = 5050
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
const { passport__main, checkAuthentication, isValidPassword, createHash, passport } = require("./SERVICIO/PASSPORT/middleware.passport")

//  CONTROLLER
const { GET_MainRoot } = require("./CONTROLLER/controllerAuth")

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
        this.app.get("/", checkAuthentication, (req, res) => {
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
                    mongoUrl:
                        'mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority',
                    mongoOptions: {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                    ttl: 3600,
                }),
                cookie: { maxAge: 60000 * 10 },

                secret: 'secreto',
                resave: false,
                saveUninitialized: false,
            }),
        )

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes() {
        this.app.use('/products/', require('./router/router__products'))
        this.app.use('/api/carrito/', require('./router/router__carritos'))
        this.app.use('/auth/', require('./router/router__auth.js'))
        this.app.use('/carritos/', require('./Router/RouterCarritos.js'))
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
        this.httpServer.listen(this.PORT, () => console.log('SERVER ON http://localhost:' + PORT))
    }
}

module.exports = Initialize__App