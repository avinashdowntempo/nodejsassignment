const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:login');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys');
const validateAuthFields = require('../middleware/validateAuthFields');
const validateLoginUser = require('../middleware/validateLoginUser');
const validatePassword = require('../middleware/validatePassword');

/* GET login token. */
function route(UserModel) {
    router.post('/', validateAuthFields, validateLoginUser(UserModel), validatePassword, (req, res, next) => {
        const {
            userName,
            userEmail,
        } = req.body;

        jwt.sign({
            userName,
            userEmail
        }, secret, (err, token) => {
            if (err) {
                debug(`error generating token`);
            }
            debug(`sending token`);
            res.json({
                token
            });
        });

    });
    return router;
}


module.exports = route;