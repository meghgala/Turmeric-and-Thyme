const mongoose = require('mongoose');

//this module returns true if the email is valid and false if the email is invalid.
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Please enter an email address'],
    },
    email:{
        type: String,
        required: [true,'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email'] // using a third party email validator
    },
    password: {
        type: String,
        required: [true,'Please enter a password'],
        minlength: [6,'The length of the password should be atleast 6 characters']
    }
});

// the two arguements in mongoose.model are ('user'- this arguement is for storing user information in user collection of databse, userSchema is the schema defined for this collection.)
const Usermodel = mongoose.model('user', userSchema)// in this syntax the last word 'user' should be singular because it will be accessed as plural form from database

module.exports = Usermodel;