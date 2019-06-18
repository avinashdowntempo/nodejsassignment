const express = require('express');
const debug = require('debug')('nodejs-assignment:type2');
const router = express.Router();
const bodyParser = require('body-parser');

let given = "ab,c#de@,'$%fgh*";
let expected = "hg,f#ed@,'$%cba*";

/* GET type2 results. */
router.post('/', (req, res, next) => {
  const {
    input
  } = req.body;
  let {
    alpha,
    symbols
  } = fixSpecialChar(input);
  debug(`alpha ${alpha} symbols ${symbols}`);
  let result = rebuildString(alpha, symbols);
  debug(`reult ${result}`);
  res.json({
    "result": result
  });
});

function fixSpecialChar(word) {
  alpha = [];
  symbols = [];
  regex = /[a-zA-Z]/;
  for (let i = 0; i < word.length; i++) {
    if (regex.test(word[i])) {
      alpha.push(word[i]);
      symbols.push(null);
    } else {
      symbols.push(word[i]);
    }
  }
  return {
    alpha,
    symbols
  }
}

function sort(array) {
  array.sort((a, b) => a - b);
  return array;
}

function rebuildString(alpha, symbols) {
  let result = '';
  count = alpha.length - 1;
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] == null) {
      result += alpha[count];
      count--;
    } else {
      result += symbols[i];
    }
  }
  return result;
}

module.exports = router;