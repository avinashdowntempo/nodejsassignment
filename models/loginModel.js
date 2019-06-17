const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const loginModel = new Schema({
    userEmail: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('Login', loginModel);