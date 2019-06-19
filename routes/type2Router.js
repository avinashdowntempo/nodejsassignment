const express = require('express');
const debug = require('debug')('nodejs-assignment:type2');
const router = express.Router();
const validateInput = require('../middleware/validateInput');
const cluster = require('cluster');

let given = "ab,c#de@,'$%fgh*";
let expected = "hg,f#ed@,'$%cba*";

/* GET type2 results. */
function route() {
  router.post('/', validateInput, (req, res, next) => {
    const { input } = req.body;
    //get symbols and alpha array
    let { alpha, symbols } = fixSpecialChar(input); 
    //append string and alpha with correct format specified
    let result = rebuildString(alpha, symbols); 

    res.json({
      "result": result
    });
  });
  return router;
}

//function to fix the special characters in new array and return the alpha characters in new array
function fixSpecialChar(word) {
  alpha = [];
  symbols = [];
  // create regex to check whether the characters are alpha
  regex = /[a-zA-Z]/; 
  for (let i = 0; i < word.length; i++) {
    //testing the character to check alpha or symbols
    if (regex.test(word[i])) { 
      alpha.push(word[i]);
      symbols.push(null);
    } else {
      symbols.push(word[i]);
    }
  }
  debug(`alpha ${alpha} symbols ${symbols} :worker id ${cluster.worker.id}`);
  return { alpha, symbols }
}

//function to rebuild the string from fixed symbols and remaining alpha characters in reverse
function rebuildString(alpha, symbols) {
  let result = '';
  // intial index of alpha characters
  count = alpha.length - 1; 
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] == null) {
      //append the alpha characters from last index and append it over the empty slots in symbol array
      result += alpha[count]; 
      // decrement the alpha index
      count--; 
    } else {
      //append the symbols if the array has symbols
      result += symbols[i]; 
    }
  }
  debug(`reult ${result} :worker id ${cluster.worker.id}`);
  return result;
}

module.exports = route();