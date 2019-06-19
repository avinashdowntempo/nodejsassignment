const passport = require('passport');
const debug = require('debug')('nodejs-assignment:auth');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const secret = require('../config/keys');

//middleware function to check whether the request has the token attached
passport.use(new JWTstrategy({
    secretOrKey: secret,
    //extracting token from the header with field authorizaton
    jwtFromRequest: ExtractJWT.fromHeader('authorization')
}, (token, done) => {
    return done(null, token);
}));