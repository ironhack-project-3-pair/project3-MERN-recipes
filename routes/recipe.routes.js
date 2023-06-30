const router = require('express').Router();

const mongoose = require('mongoose');

const Recipe = require('../models/Recipe.model');
const Ingredient = require('../models/Ingredient.model');

// POST /api/recipes
router.post('/recipes', (req, res, next) => {
  const newRecipe = {
    name: req.body.name,
    instructions: req.body.instructions,
    durationInMin: req.body.durationInMin,
    recipeIngredients: [],
  };
  Recipe.create(newRecipe)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(500).json(err);
      } else if (err.code === 11000) {
        res.status(500).json({
          errorMessage:
            'Recipe name needs to be unique. Provide a different recipe name.',
        });
      } else {
        next(err);
      }

    });
});

// GET /api/recipes
router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log('error getting list of Recipes', err);
      res.status(500).json({
        message: 'error getting list of Recipes',
        error: err,
      });
    });
});

// GET /api/recipes/:recipeId
router.get('/recipes/:recipeId', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.recipeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Recipe.findById(req.params.recipeId)
    .then(response => res.status(200).json(response))
    .catch((err) => {
      console.log('error getting recipe', err);
      res.status(500).json({
      message: 'error getting recipe',
      error: err,
      });
    });
});

// PUT /api/recipes/:recipeId
router.put('/recipes/:recipeId', (req, res, next) => {
    
  if (!mongoose.Types.ObjectId.isValid(req.params.recipeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const newRecipe = {
    name: req.body.name,
    instructions: req.body.instructions,
    durationInMin: req.body.durationInMin,
    recipeIngredients: req.body.recipeIngredients,
  }

  Recipe.findByIdAndUpdate(req.params.recipeId, newRecipe, { new: true })
    .then(response => {
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log('error updating recipe', err);
      res.status(500).json({
      message: 'error updating recipe',
      error: err,
      });
    });
});

// DELETE /api/recipes/:recipeId
router.delete('/recipes/:recipeId', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.recipeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Recipe.findByIdAndDelete(req.params.recipeId)
    .then(response => res.status(200).json(response))
    .catch((err) => {
      console.log('error deleting recipe', err);
      res.status(500).json({
        message: 'error deleting recipe',
        error: err,
      });
    });
});

module.exports = router;
