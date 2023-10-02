const Usermodel = require('../models/user');

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
       res.status(201).json(user)
    }
    catch(err){
        console.log(err);
        res.status(400).send('error, user not created')
    }

}

module.exports.login_post = async (req,res) => {
    console.log(req.body)
    res.send('user login')
    // const {username,email,password} = req.body;
}