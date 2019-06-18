const express = require('express');
const router = express.Router();

const debug = require('debug')('nodejs-assignment:signup');
const validateAuthFields = require('../middleware/validateAuthFields');
const validatesignupUser = require('../middleware/validateSignupUser');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET signup result. */
function route(UserModel) {
    router.post('/', validateAuthFields, validatesignupUser(UserModel), (req, res, next) => {
        const {
            userName,
            userEmail,
            password
        } = req.body;

        const user = new UserModel({
            userName,
            userEmail,
            password
        })

        user.save().then(() => console.log('saved'));
        res.json({
            message: 'Signup successful',
        });

    });
    return router;
}


module.exports = route;