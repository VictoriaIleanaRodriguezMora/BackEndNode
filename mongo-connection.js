const express = require("express");
const session = require("express-session");

const MongoStore = require("connect-mongo");

const app = express();

app.use(
    session({

        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority",
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        }),
        ttl: 3600,
        secret: "secreto",
        resave: false,
        saveUninitialized: false,
    })
);

app.listen(4040, () => {
    console.log(`Example app listening on port http://localhost:4040`);
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

// http://localhost:4040/login?username=pepe&password=pepepass
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
