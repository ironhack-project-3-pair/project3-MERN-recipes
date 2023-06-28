const router = require("express").Router();

const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");
const Ingredient = require("../models/Ingredient.model");

// POST /api/recipes
router.post("/recipes", (req, res, next) => {
    
});

// GET /api/recipes
router.get('/recipes', (req, res, next) => {
    
});

// GET /api/recipes/:recipeId
router.get('/recipes/:recipeId', (req, res, next) => {

});

// PUT /api/recipes/:recipeId
router.put('/recipes/:recipeId', (req, res, next) => {

});

// DELETE /api/recipes/:recipeId
router.delete('/recipes/:recipeId', (req, res, next) => {

});

module.exports = router;
