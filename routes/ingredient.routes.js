const router = require('express').Router();

const mongoose = require('mongoose');
const { MongoServerError, ErrorDescription } = require('mongodb');

const Recipe = require('../models/Recipe.model');
const Ingredient = require('../models/Ingredient.model');

// POST /api/ingredients
router.post('/ingredients', (req, res, next) => {
  const { name, emoji } = req.body;
  Ingredient.create({ name, emoji })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log('error creating ingredient', err);
      if (err instanceof mongoose.Error.ValidationError) {
        //
      } else if (err instanceof MongoServerError) {
        // console.log(err.name) // "MongoServerError"
        // console.log(err.message) // "E11000 duplicate key error collection: project3-MERN-recipes-server.ingredients index: name_1 dup key: { name: "xxx" }"
        // console.log(err.stack)
        // console.log(err.index) // i
        // console.log(err.code) // 11000
        // console.log(err.keyPattern) // { name: 1 },
        // console.log(err.keyValue) // { name: 'xxx' },
        err.message2 = err.message; // copy the error message in another property because it is somehow removed in the error received in client...
      } else if (err instanceof mongoose.Error.StrictModeError) {
        err.message2 = err.message;
      }
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
      res.status(200).json(response);
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
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log('error getting details of a ingredient', err);
        res.status(500).json({
          message: 'error getting details of a ingredient',
          error: err,
        });
      });
});

module.exports = router;
