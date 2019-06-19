const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:type1');

const cluster = require('cluster');
const validateInput = require('../middleware/validateInput');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET type1 result. */

function route() {
  //validating input present using middleware
  router.post('/', validateInput, (req, res, next) => {
    const {
      input
    } = req.body;
    let sorted = sort(input); // sort the array
    let { odd, even } = getOddEven(sorted); //split the array to odd and even
    let result = mergeOddEven(odd, even); //merge both odd and even in alternate order

    res.json({
      "result": result
    });
  });
  return router;
}

function getOddEven(array) {
  let odd = [];
  let even = [];
  //looping the array in descending order
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] % 2 != 0) {
      // if value is odd push the value to odd array
      odd.push(array[i]);
    } else {
      // if value is even push the value to the start index in even array
      even.unshift(array[i]);
    }
  }
  debug(`odd array ${odd} worker id ${cluster.worker.id}`);
  debug(`even array ${even} worker id ${cluster.worker.id}`);
  return { odd, even };
}

//function to sort the array in ascending
function sort(array) {
  array.sort((a, b) => a - b);
  debug(`sorted array ${array} worker id ${cluster.worker.id}`);
  return array;
}

//function to merge odd and even array in alternate fashion
function mergeOddEven(odd, even) {
  result = [];
  const loop = Math.max(odd.length, even.length); //get the max length of any array to loop through
  debug(`loop length ${loop} worker id ${cluster.worker.id}`);
  for (let i = 0; i < loop; i++) {
    if (odd[i]) {
      //check if the odd value is present or not and append it to the array
      result.push(odd[i]);
    }
    if (even[i]) {
      //check if the even value is present or not and append it to the array
      result.push(even[i]);
    }
  }
  debug(`result ${result} worker id ${cluster.worker.id}`);
  return result;
}

module.exports = route();