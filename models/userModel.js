const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
    Schema
} = mongoose;

const userModel = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userModel.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});



module.exports = mongoose.model('Signup', userModel);