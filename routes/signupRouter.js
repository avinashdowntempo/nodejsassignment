const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:server');
const bodyParser = require('body-parser');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET signup result. */
function route(Signup) {
    router.post('/', (req, res, next) => {
        const signup = new Signup({
            userName: "avinash",
            userEmail: "avinashj4394@gmail.com",
            password: "admin"
        })
        signup.save().then(() => console.log('saved'));
        res.json({
            "result": "signup success"
        });
    });
    return router;
}


module.exports = route;