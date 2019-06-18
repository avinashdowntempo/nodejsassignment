const express = require('express');
const router = express.Router();

const debug = require('debug')('nodejs-assignment:signup');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET signup result. */
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
                res.status(400).json({
                    error: err,
                });
            } else if (user) {
                res.status(400).json({
                    message: 'User Already Registered',
                });
            } else {
                const user = new UserModel({
                    userName,
                    userEmail,
                    password
                })

                user.save().then(() => console.log('saved'));
                res.json({
                    message: 'Signup successful',
                });
            }
        });



    });
    return router;
}


module.exports = route;