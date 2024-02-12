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

module.exports.search_post = async (req, res) => {
  try {
    const searchWord = req.body.searchWord;
    const regex = new RegExp(searchWord, 'i');
    const recipes = await Recipemodel.find({ recipeDescription: regex });
    console.log(searchWord)
    res.status(201).json({recipes}) //we use .json to send back or to respond(res) to the front page with the json file of the user collection.
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports.search_get = async (req, res) => {
  try {
    const searchword_html = req.query.searchword_html;
      if (!searchword_html) {
      return res.status(400).send('Recipe ID is required');
    }
    const regex = new RegExp(searchword_html, 'i');
    const recipes = await Recipemodel.find({ recipeDescription: regex });
    console.log(searchword_html)

    // Validate that the recipe exists
    if (!recipes) {
      return res.status(404).send('Recipe not found');
    }
    // Render the recipeblog page with the retrieved recipe
    res.render('searched', { recipes});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.viewrecipe_get = async (req,res) => {
    const userId = res.locals.userid;
    const user_recipes = await Recipemodel.find({ userId });
    const recipes = await Recipemodel.find();
    res.render('viewrecipe', { recipes, user_recipes });
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