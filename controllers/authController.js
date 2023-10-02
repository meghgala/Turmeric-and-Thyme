const Usermodel = require('../models/user');

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

    //duplicate error code
    if (err.code === 11000){
        errors.email = "that email is already registered";
        return errors
    }

    return errors;
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
       res.status(201).json(user) //we use .json to send back or to respond(res) to the front page with the json file of the user collection.
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).send({errors}) // we send back error from the handleErrors function in json format to the user in frontend
    } 
}

module.exports.login_post = async (req,res) => {
    console.log(req.body)
    res.send('user login')
    // const {username,email,password} = req.body;
}