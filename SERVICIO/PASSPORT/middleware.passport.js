const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const schemaUsuariosPassport = require("../../models/schemaUsuariosPassport");

// LOG4JS 
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()


//  ------------ PASSPORT ------------  

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function passport__main() {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        schemaUsuariosPassport.findById(id, done);
    });

    // -- LOGIN --
    passport.use(
        "login",
        new LocalStrategy((username, password, done) => {
            schemaUsuariosPassport.findOne({ username }, (err, user) => {
                if (err) {
                    logger.info({ error: "LOGIN" })
                    return done(err)
                };

                if (!user) {
                    logger.info({ user_not_found: username })
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    logger.info({ invalid: "password" })
                    return done(null, false);
                }

                return done(null, user);
            });
        })
    );


    // -- SIGN UP --
    passport.use(
        "signup",
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            (req, username, password, done) => {
                schemaUsuariosPassport.findOne({ username: username }, function (err, user) {
                    if (err) {
                        logger.info({ error: "SIGN UP" })
                        return done(err);
                    }

                    if (user) {
                        logger.info({ SIGN_UP: "User already exists" })
                        return done(null, false);
                    }

                    const newUser = {
                        username: username,
                        password: createHash(password),
                    };

                    schemaUsuariosPassport.create(newUser, (err, userWithId) => {
                        if (err) {
                            logger.info({ SIGN_UP: "Error in Saving user" })
                            return done(err);
                        }
                        logger.debug(user)
                        logger.debug("User Registration succesful")
                        return done(null, userWithId);
                    });
                });
            }
        )
    );
}


function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/signup");
    }
}


module.exports = { passport__main, checkAuthentication, isValidPassword, createHash, passport }