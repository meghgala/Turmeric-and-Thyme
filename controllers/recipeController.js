const Recipemodel = require('../models/recipe');
const Usermodel = require('../models/user');

module.exports.inputrecipe_get = (req,res) => {
    res.render('inputrecipe'); 
}

module.exports.inputrecipe_post = async (req,res) => {
    const userId = res.locals.userid;
    console.log(res.locals.userid)
    const {recipeTitle,recipeDescription,imageURL,ingredients,steps,calories,servings,prepTime,cookingTime} = req.body;
    const recipe = await Recipemodel.create({recipeTitle,recipeDescription,imageURL,ingredients:ingredients,steps:steps,calories,servings,prepTime,cookingTime,userId});
    res.status(201).json({recipe: recipe._id}) //we use .json to send back or to respond(res) to the front page with the json file of the user collection.
}

module.exports.index_get = async (req,res) => {
  const userId = res.locals.userid;
  const userinfo = await Usermodel.findOne({ _id: userId });
  const recipes = await Recipemodel.find();
  res.render('index', { recipes,userinfo});
}

module.exports.viewrecipe_get = async (req,res) => {
    const userId = res.locals.userid;
    const recipes = await Recipemodel.find({ userId });
    res.render('viewrecipe', { recipes });
}

module.exports.viewrecipe_post = async (req,res) => {
    const recipeId = req.body.recipeId;
    console.log(recipeId)
    const recipe = await Recipemodel.find({ _id: recipeId });
    res.render('recipeblog', { recipe });
}

module.exports.recipeblog_get = async (req, res) => {
    try {
      const recipeId = req.query.recipeId;
  
      // Validate that the recipeId is provided
      if (!recipeId) {
        return res.status(400).send('Recipe ID is required');
      }
  
      // Fetch the recipe from the database based on the recipeId
      const recipe = await Recipemodel.findOne({ _id: recipeId });
  
      // Validate that the recipe exists
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }
  
      // Render the recipeblog page with the retrieved recipe
      res.render('recipeblog', { recipes:[recipe] });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };