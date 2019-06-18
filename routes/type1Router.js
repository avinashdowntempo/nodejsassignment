const express = require('express');
const router = express.Router();
const debug = require('debug')('nodejs-assignment:type1');
const bodyParser = require('body-parser');

let given = [31, 32, 43, 23, 4, 8];
let expected = [43, 4, 31, 8, 23, 32];

/* GET type1 result. */
router.post('/', verifyToken, (req, res, next) => {
  const {
    input
  } = req.body;
  let sorted = sort(input);
  let {
    odd,
    even
  } = getOddEven(sorted);

  let result = mergeOddEven(odd, even);

  debug(`sorted string ${sorted}`);
  debug(`odd string ${odd}`);
  debug(`even string ${even}`);
  debug(`result ${result}`);

  res.json({
    "result": result
  });
});

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
  for (let i = 0; i < odd.length; i++) {
    result.push(odd[i], even[i]);
  }
  return result;
}

module.exports = router;