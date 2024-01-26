const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// defining databse URL
const dburl = 'mongodb+srv://meghgala:*Aom9820354556@turmeric.ldsxedw.mongodb.net/turmandthyme?retryWrites=true&w=majority';
mongoose.connect(dburl,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(PORT))
.catch((err) => console.log(err));

// view engine
app.set('view engine','ejs')

//middleware
app.use(express.static('public'))
app.use(express.json()) // it takes any json data that comes as a request and parses it into a javascript object for us to use inside the code. (req.body)
app.use(cookieParser())

// req (short for request): This parameter contains information about the incoming request, such as headers, query parameters, and request data.
// res (short for response): This parameter is used to send a response back to the client, such as HTML content, JSON data, or other HTTP responses.
// req and res are objects which has a lot of methods

app.get('*', checkUser)

app.get('/contactus',(req,res) => {
    res.render('contactus')
});

app.use(authRoutes)
//--------------------------------------------------------------------------------------------------------------------------------------------------------

// When you include and configure the "cookie-parser" middleware in your Express.js application, it provides you with the ability to:

// Parse incoming HTTP requests and extract cookie data.
// Create and set cookies in outgoing HTTP responses.
// Manipulate and manage cookies, including options like setting expiration times and secure flags.