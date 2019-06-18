const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const debug = require('debug')('nodejs-assignment:login');


/* GET login token. */

function route() {
    router.post('/', (req, res, next) => {
        const user = {
            userName: "avinash",
            userEmail: "avinashj4394@gmail.com",
        };
        jwt.sign({ user }, 'secretkey', (err, token) => {
            res.json({
                token
            });
        });

    });
    return router;
}


module.exports = route();