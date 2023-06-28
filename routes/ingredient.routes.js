const router = require("express").Router();

const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");
const Ingredient = require("../models/Ingredient.model");

// POST /api/ingredients
router.post("/ingredients", (req, res, next) => {
    const { name } = req.body;
    Ingredient.create({ name })
        .then(response => {
            res.status(201).json({message: "ingredient document created: " + response.name})
        })
        .catch(e => console.log("Error creating ingredient: " + e))
});

// GET /api/ingredients
router.get('/ingredients', (req, res, next) => {
    
});

// GET /api/ingredients/:ingredientId
router.get('/ingredients/:ingredientId', (req, res, next) => {

});

module.exports = router;