const mongoose = require('mongoose');
const { isEmail } = require('validator');

// Define a custom password hasher function
const hashPassword = (password) => {
    // Static salt
    const salt = 'mySalt123'; // You can change this to a more secure value

    // Combine password with salt
    const saltedPassword = password + salt;

    // Simple hashing algorithm 
    let hashedPassword = '';
    for (let i = 0; i < saltedPassword.length; i++) {
        const charCode = saltedPassword.charCodeAt(i);
        hashedPassword += String.fromCharCode(charCode + 1); // Increment each character code
    }

    return hashedPassword;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a Username'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'The length of the password should be at least 6 characters']
    }
});

// Fire a function before document is saved to database.
userSchema.pre('save', function(next) {
    // Hash the password before saving
    this.password = hashPassword(this.password);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = password === user.password;
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const Usermodel = mongoose.model('user', userSchema);
module.exports = Usermodel;
