const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:server');
const bodyParser = require('body-parser');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET signup result. */
router.post('/', (req, res, next) => {

    res.json({
        "result": "login success"
    });
});


module.exports = router;