const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const signupModel = new Schema({
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('Signup', signupModel);