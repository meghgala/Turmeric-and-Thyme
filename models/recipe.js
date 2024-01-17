const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeTitle: {
        type: String,
        // required: [true,'Please enter a Title'],
    },
    recipeDescription: {
        type: String,
        // required: [true,'Please enter a Decsription'],
    },
    imageURL: {
        type: String,
        // required: [true,'Please enter a Decsription'],
    },
    ingredients: [{
        type: String,
        // required: [true,'Please enter ingredients'],
    }],
    steps: [{
        type: String,
        // required: [true,'Please enter the steps'],
    }],
    calories: {
        type: String,
        // required: [true,'Please enter the calories'],
    },
    servings: {
        type: String,
        // required: [true,'Please enter the servings'],
    },
    prepTime: {
        type: String,
        // required: [true,'Please enter a preparation time'],
    },
    cookingTime: {
        type: String,
        // required: [true,'Please enter a cooking time'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Store user ID as an ObjectID
        ref: 'user' // Reference the User model
    }
})

recipeSchema.post('save',function(doc,next){                
    console.log('new recipe was created and saved', doc);
    next();
})

// the two arguements in mongoose.model are ('user'- this arguement is for storing user information in user collection of databse, userSchema is the schema defined for this collection.)
const Recipemodel = mongoose.model('recipe', recipeSchema)// in this syntax the last word 'user' should be singular because it will be accessed as plural form from database

module.exports = Recipemodel;