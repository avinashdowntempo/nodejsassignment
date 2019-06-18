const passport = require('passport');
const UserModel = require('../models/userModel');
const debug = require('debug')('nodejs-assignment:auth');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJWT.fromHeader('authorization')

}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));