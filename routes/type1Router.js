const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:type1');

const cluster = require('cluster');
const validateInput = require('../middleware/validateInput');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET type1 result. */

function route() {
  router.post('/', validateInput, (req, res, next) => {
    const {
      input
    } = req.body;
    let sorted = sort(input);
    let {
      odd,
      even
    } = getOddEven(sorted);

    let result = mergeOddEven(odd, even);

    debug(`sorted string ${sorted} worker id ${cluster.worker.id}`);
    debug(`odd string ${odd} worker id ${cluster.worker.id}`);
    debug(`even string ${even} worker id ${cluster.worker.id}`);
    debug(`result ${result} worker id ${cluster.worker.id}`);

    res.json({
      "result": result
    });
  });
  return router;
}

function getOddEven(array) {
  let odd = [];
  let even = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] % 2 != 0) {
      odd.push(array[i]);
    } else {
      even.unshift(array[i]);
    }
  }
  return {
    odd,
    even
  };
}

function sort(array) {
  array.sort((a, b) => a - b);
  return array;
}

function mergeOddEven(odd, even) {
  result = [];
  const loop = Math.max(odd.length, even.length);
  debug(`loop length ${loop} worker id ${cluster.worker.id}`);
  for (let i = 0; i < loop; i++) {
    if (odd[i]) {
      result.push(odd[i]);
    }
    if (even[i]) {
      result.push(even[i]);
    }
  }

  return result;
}

module.exports = route();