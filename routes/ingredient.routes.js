const router = require('express').Router();

const mongoose = require('mongoose');

const Recipe = require('../models/Recipe.model');
const Ingredient = require('../models/Ingredient.model');

// POST /api/ingredients
router.post('/ingredients', (req, res, next) => {
  const { name } = req.body;
  Ingredient.create({ name })
    .then((response) => {
      res
        .status(201)
        .json({ message: 'ingredient document created: ' + response.name });
    })
    .catch((err) => {
      console.log('error creating ingredient', err);
      res.status(500).json({
        message: 'error creating ingredient',
        error: err,
      });
    });
});

// GET /api/ingredients
router.get('/ingredients', (req, res, next) => {
  Ingredient.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log('error getting list of ingredients', err);
      res.status(500).json({
        message: 'error getting list of ingredients',
        error: err,
      });
    });
});

// GET /api/ingredients/:ingredientId
router.get('/ingredients/:ingredientId', (req, res, next) => {
    const { ingredientId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    Ingredient.findById(ingredientId)
      .then((response) => res.json(response))
      .catch((err) => {
        console.log('error getting details of a ingredient', err);
        res.status(500).json({
          message: 'error getting details of a ingredient',
          error: err,
        });
      });
});

module.exports = router;
