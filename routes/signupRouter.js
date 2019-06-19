const express = require('express');
const router = express.Router();
const cluster = require('cluster');

const debug = require('debug')('nodejs-assignment:signup');
const validateAuthFields = require('../middleware/validateAuthFields');
const validatesignupUser = require('../middleware/validateSignupUser');

let given = [31, 32, 43, 23, 4, 8]; //sample inpupt
let expected = [43, 4, 31, 8, 23, 32]; //sample output

/* GET signup result. */
//doing validations using middlewares
function route(UserModel) {
    router.post('/', validateAuthFields, validatesignupUser(UserModel), (req, res, next) => {
        const {
            userName,
            userEmail,
            password
        } = req.body;
        //creating a new user model
        const user = new UserModel({
            userName,
            userEmail,
            password
        })
        //saving the user to database
        user.save().then(() => debug(`saved the user to the DB: worker id ${cluster.worker.id}`));
        res.status(200).json({
            message: 'Signup successful',
        });

    });
    return router;
}


module.exports = route;