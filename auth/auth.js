const passport = require('passport');
const debug = require('debug')('nodejs-assignment:auth');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const secret = require('../config/keys');

passport.use(new JWTstrategy({
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromHeader('authorization')
}, (token, done) => {
    return done(null, token);
}));