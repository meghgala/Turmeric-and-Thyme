const mongoose = require('mongoose');

//this module returns true if the email is valid and false if the email is invalid.
const { isEmail } = require('validator')

// password hasher module
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Please enter a Username'],
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

//To fire a function after a document is saved to database
// the post here is not a get/post request, it is a method to indicate what to do after userschema is saved. 
// The next() function is used to pass control to the next middleware function in the stack.s
userSchema.post('save',function(doc,next){                
    console.log('new user was created and saved', doc);
    next();
})

// Fire a function before document is saved to database.
//salt is a string added in front of password to add more security during hashing
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('incorrect email')
}

// the two arguements in mongoose.model are ('user'- this arguement is for storing user information in user collection of databse, userSchema is the schema defined for this collection.)
const Usermodel = mongoose.model('user', userSchema)// in this syntax the last word 'user' should be singular because it will be accessed as plural form from database

module.exports = Usermodel;