const { Router } = require('express');
const authController = require('../controllers/authController')
const recipeController = require('../controllers/recipeController')
const { requireAuth, checkUser } = require("../middleware/authMiddleware");


const router = Router();

router.get('/signup',authController.signup_get);
router.get('/login',authController.login_get);
router.post('/signup',authController.signup_post);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);

router.get('/inputrecipe',recipeController.inputrecipe_get)
router.post('/inputrecipe',checkUser,recipeController.inputrecipe_post);

router.get('/viewrecipe',recipeController.viewrecipe_get)
router.post('/viewrecipe',recipeController.viewrecipe_post)

router.get('/recipeblog',recipeController.recipeblog_get)

router.get('/index',recipeController.index_get)

module.exports = router;