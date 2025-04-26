// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/AuthMiddleware'); // Assuming you have this middleware to authenticate users
const { createRecipe, getAllRecipes } = require("../controllers/RecipeController");

// Apply authentication middleware to all routes
// router.use(authenticate);

// Create a new recipe (authentication required)
router.post("/", authenticate, createRecipe);
// router.post("/", createRecipe);


// Get all recipes (authentication required)
router.get("/", authenticate, getAllRecipes);
// router.get("/", getAllRecipes);

module.exports = router;
