const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

// the two arguements in mongoose.model are ('user'- this arguement is for storing user information in user collection of databse, userSchema is the schema defined for this collection.)
const Usermodel = mongoose.model('user', userSchema)// in this syntax the last word 'user' should be singular because it will be accessed as plural form from database

module.exports = Usermodel;