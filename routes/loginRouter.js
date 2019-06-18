const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys');


/* GET login token. */
function route(UserModel) {
    router.post('/', (req, res, next) => {
        const {
            userName,
            userEmail,
            password
        } = req.body;
        if (!userName || !userEmail || !password) {
            res.status(400).json({
                message: 'fields are Invalid',
            });
        }
        UserModel.findOne({
            userEmail
        }, (err, user) => {
            if (err) {
                debug(`error`);
                res.status(400).json({
                    error: err,
                });
            } else if (!user) {
                debug(`user doesnt exist`);
                res.status(400).json({
                    message: 'User Does Not Exist',
                });
            } else {

                bcrypt.compare(password, user.password, (err, valid) => {
                    // res == true
                    if (valid) {
                        debug(`valid password`);
                        jwt.sign({
                            userName,
                            userEmail
                        }, secret, (err, token) => {
                            if (err) {
                                debug(`error generating token`);
                            }
                            debug(`sending json`);
                            res.json({
                                token
                            });
                        });
                    } else {
                        res.status(401).json({
                            error: "invalid Password"
                        });
                    }
                });

            }
        });



    });
    return router;
}


module.exports = route;