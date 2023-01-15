const express = require("express")
const session = require("express-session");

// redis
const redis = require("redis");

const client = redis.createClient({
    legacyMode: true,
});

client.connected()
    .then(() => { console.log("Conectado a redis"); })
    .catch((e) => console.log(e))
const RedisStore = require("connect-redis")(session);
// redis

const app = express();

app.use(session({
    store: new RedisStore({ host: "127.0.0.1", port: 6379, client, ttl: 300 }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}))


app.listen(7000, () => {
    console.log(`http://localhost:7000`);
});

app.get("/", (req, res) => {
    if (req.session.cont) {
        req.session.cont++;
        res.send("nos visitaste " + req.session.cont);
    } else {
        req.session.cont = 1;
        res.send("nos visitaste " + 1);
    }
});


app.get("/showsession", (req, res) => {
    res.json(req.session);
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send("no pudo deslogear");
        } else {
            res.send("borramos todos quedate tranquilo que ya estas deslogeado");
        }
    });
});

app.get("/login", (req, res) => {
    const { username, password } = req.query;
    if (username !== "pepe" || password !== "pepepass") {
        return res.send("login failed");
    }
    req.session.user = username;
    req.session.admin = true;
    res.send("login success!");
});

function auth(req, res, next) {
    if (req.session && req.session.user === "pepe" && req.session.admin) {
        return next();
    } else {
        return res.status(401).send("error de autorización!");
    }
}

app.get("/informacionconfidencial", auth, (req, res) => {
    res.send(
        "si estas viendo esto es porque ya te logueaste, sos admin y sos pepe!"
    );
});

