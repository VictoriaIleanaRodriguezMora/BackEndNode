const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require("bcrypt");
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const UsuariosSchema = require("../models/schemaUsuarios");

//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 
function loginPASSPORT() {
    return new LocalStrategy((username, password, done) => {
        UsuariosSchema.findOne({ username }, (err, user) => {
            if (err) return done(err);

            if (!user) {
                console.log("User Not Found with username " + username);
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                console.log("Invalid Password");
                return done(null, false);
            }

            return done(null, user);
        });
    })
}
// login

function signupPASSPORT() {
    return new LocalStrategy(
        {
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            UsuariosSchema.findOne({ username: username }, function (err, user) {
                if (err) {
                    console.log("Error in SignUp: " + err);
                    return done(err);
                }

                if (user) {
                    console.log("User already exists");
                    return done(null, false);
                }

                const newUser = {
                    username: username,
                    password: createHash(password),
                };
                UsuariosSchema.create(newUser, (err, userWithId) => {
                    if (err) {
                        console.log("Error in Saving user: " + err);
                        return done(err);
                    }
                    console.log(user);
                    console.log("User Registration succesful");
                    return done(null, userWithId);
                });
            });
        }
    )
}
// signup

function serializeUser() {
    return passport.serializeUser((user, done) => {
        done(null, user._id);
    });
}
function deserializeUser() {
    return passport.deserializeUser((id, done) => {
        UsuariosSchema.findById(id, done);
    });

}
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UsuariosSchema.findById(id, done);
});


function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function sessionPassport() {
    return session({
        store: MongoStore.create({
            mongoUrl:
                process.env.MONGO_ATLAS_URL,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 3600,
        }),
        cookie: { maxAge: 60000 * 10 },

        secret: process.env.PASSPORT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  }

//  ------------ PASSPORT ------------  ------------ PASSPORT ------------ 



module.exports = { loginPASSPORT, signupPASSPORT, deserializeUser, serializeUser, isValidPassword, createHash, sessionPassport, checkAuthentication }