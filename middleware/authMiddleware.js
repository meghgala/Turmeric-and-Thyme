const jwt = require('jsonwebtoken')
const User = require('../models/user');


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check jsn wen token exists and is verified
    // we take 3 arguments in verify function
    // 1 - jwt token itself
    // 2 - the secret that is used in authcontroller file to make the token
    // 3 - a function which decides what to do if the token is valid(decoded) or invalid(err)
    if(token){
        jwt.verify(token,'gala secret key',(err,decodedToken) => { 
            if (err) {
            console.log(err.message)
            res.redirect('/login')
            }
            else{
                console.log(decodedToken)
                next();
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    console.log('Middleware is executing.');
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'gala secret key',async (err,decodedToken) => { 
            if (err) {
                console.log(err.message)
                res.locals.userid = null
                next();
            }
            else{
                console.log(decodedToken)
                let userid = await User.findById(decodedToken.id)
                res.locals.userid = userid._id
                //console.log(res.locals.userid)
                next();
            }
        })
    }
    else{
        res.locals.userid = null
        next();
    }
}

module.exports = { requireAuth, checkUser };