const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:login');
const jwt = require('jsonwebtoken');
const cluster = require('cluster');

const secret = require('../config/keys');
const validateAuthFields = require('../middleware/validateAuthFields');
const validateLoginUser = require('../middleware/validateLoginUser');
const validatePassword = require('../middleware/validatePassword');

/* GET login token. */
//using middleware to do validation
function route(UserModel) {
    router.post('/', validateAuthFields, validateLoginUser(UserModel), validatePassword, (req, res, next) => {
        const {
            userName,
            userEmail,
        } = req.body;
        // signing the JWT token for the valid user
        jwt.sign({
            userName,
            userEmail
        }, secret, (err, token) => {
            if (err) {
                debug(`error generating token :worker id ${cluster.worker.id}`);
            }
            debug(`sending token :worker id ${cluster.worker.id}`);
            //sending the token back to user
            res.status(200).json({
                token
            });
        });

    });
    return router;
}


module.exports = route;