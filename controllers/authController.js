const Usermodel = require('../models/user');
const jwt = require('jsonwebtoken')

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email:'',password:''} // an error object is created to send back the user a json object to indicate where the email and password error has occured

    // validation errors
    // the err.errors is a json object with a lot of properties as follows which we will access in the following function
    // {
    //     message: 'Please enter a valid email',
    //     type: 'user defined',
    //     validator: <ref *1> [Function: isEmail] { default: [Circular *1] },
    //     path: 'email',
    //     value: 'hi'
    //   }
    //   {
    //     validator: [Function (anonymous)],
    //     message: 'Path `password` (`hell`) is shorter than the minimum allowed length (6).',        
    //     type: 'minlength',
    //     minlength: 6,
    //     path: 'password',
    //     value: 'hell'
    //   }
    // ------------------------------------------------------------------------------------------
    if (err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    if(err.message === 'Incorrect password'){
        errors.password = 'that password is not correct'
    }

    //duplicate error code
    if (err.code === 11000){
        errors.email = "that email is already registered";
        return errors
    }

    return errors;
}


//--------------------------------------------------------------------------------------------------
//here id is the id that is automatically created when a new user is generated in the database
//id is the payload in the jwt token, a payload is the content of the token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'gala secret key',{
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req,res) => {
    res.render('signup'); 
}

module.exports.login_get = (req,res) => {
    res.render('login'); 
}

module.exports.signup_post = async (req,res) => {
    
    const {username,email,password} = req.body;
    try{
       const user = await Usermodel.create({username,email,password});
       const token = createToken(user._id) // user token is generated where user id is the payload. This cookie is then sent to the frontend using a cookie.
       res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge * 1000})
       res.status(201).json({user: user._id}) //we use .json to send back or to respond(res) to the front page with the json file of the user collection.
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).send({errors}) // we send back error from the handleErrors function in json format to the user in frontend
    } 
}

module.exports.login_post = async (req,res) => {
    const {email,password} = req.body;
    
    try{
        const user = await Usermodel.login(email,password)
        const token = createToken(user._id) // user token is generated where user id is the payload. This cookie is then sent to the frontend using a cookie.
        res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge * 1000})
        res.status(200).json({user:user._id})
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.logout_get = (req,res) => {
    res.cookie('jwt','',{maxAge: 1})
    res.redirect('/index')
}