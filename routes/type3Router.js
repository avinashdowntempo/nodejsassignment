const express = require('express');
const debug = require('debug')('nodejs-assignment:type3');
const router = express.Router();
const validateInput = require('../middleware/validateInput');

let given = [1, 3, 4, 7, 9, 10];
let expected = [2, 5, 6, 8]

/* GET type3 results */
function route() {
    router.post('/', validateInput, (req, res, next) => {
        const {
            input
        } = req.body;
        let sortedArray = sort(input);
        let result = getMissingNumber(sortedArray);
        res.json({
            "result": result
        });
    });
    return router;
}

function sort(array) {
    array.sort((a, b) => a - b);
    return array;
}

function getMissingNumber(array) {
    result = [];
    lastval = array[0];
    for (let i = 1; i < array.length; i++) {
        for (let j = lastval + 1; j < array[i]; j++) {
            result.push(j);
        }
        lastval = array[i];
    }
    debug(`missing values ${result}`);
    return result;
}

module.exports = route();