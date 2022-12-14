const express = require('express')
const session = require('express-session')
const app = express()

const MongoStore = require('connect-mongo')

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

/* app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    ttl: 3620,
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  }),
) */

app.listen(4040, () => {
  console.log(`Example app listening on port http://localhost:4040`)
})
/* 
app.get('/', (req, res) => {
  if (req.session.cont) {
    req.session.cont++
    res.send('nos visitaste ' + req.session.cont)
  } else {
    req.session.cont = 1
    res.send('nos visitaste ' + 1)
  }
})
 */
/* 
app.get('/showsession', (req, res) => {
  res.json(req.session)
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('no pudo deslogear')
    } else {
      res.send('borramos todos quedate tranquilo que ya estas deslogeado')
    }
  })
})

app.get('/login', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
      // if (username == "nombre" || password !== "1234") {
      //       res.send("login success");
      //   }
      // req.session.user = username;
      //   req.session.admin = true;
  // res.send("login success!");
  res.sendFile('/public/login.html', { root: __dirname })
}) 

app.get('/sign', (req, res) => {
  const { nameLogin, contrasenaLogin } = req.body
  console.log(nameLogin, contrasenaLogin)

  res.json({ nameLogin, contrasenaLogin })
})

function auth(req, res, next) {
  if (req.session && req.session.user === 'pepe' && req.session.admin) {
    return next()
  } else {
    return res.status(401).send('error de autorización!')
  }
}

app.get('/informacionconfidencial', auth, (req, res) => {
  res.send(
    'si estas viendo esto es porque ya te logueaste, sos admin y sos pepe!',
  )
})
 */