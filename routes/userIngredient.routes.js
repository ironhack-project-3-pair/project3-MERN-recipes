const router = require('express').Router();

const mongoose = require('mongoose');

const User = require('../models/User.model');

// GET /api/user-ingredients
router.get('/user-ingredients', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  User.findOne({ _id: userId }, { userIngredients: 1 }) // using a projection, returns an object containing only the array and its id)
    .populate("userIngredients.ingredient")
    .then(response => {
      res.status(201).json(response.userIngredients);
    })
    .catch(err => {
      console.log("error getting userIngredients", err);
      res.status(500).json({
        message: "error getting userIngredients",
        error: err
      });
    })
});

// GET /api/user-ingredients/id
router.get('/user-ingredients/:userIngredientId', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.userIngredientId)) {
    res.status(404).json({ message: 'userIngredient id is not valid' });
    return;
  }

  const { userIngredientId } = req.params;
  User.findOne({ _id: userId }, { userIngredients: { $elemMatch: { _id: userIngredientId } } }) // using a projection, returns an object containing only the array (with a single element) and its id)
    .populate("userIngredients.ingredient")
    .then(response => {
      if (response.userIngredients[0]) {
        res.status(201).json(response.userIngredients[0]);
      } else {
        res.status(404).json({
          message: "error getting userIngredient: not found",
      })
      }
    })
    .catch(err => {
      console.log("error getting userIngredient", err);
      res.status(500).json({
        message: "error getting userIngredient",
        error: err
    });
    })
});

// POST /api/user-ingredients
router.post('/user-ingredients', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  const newUserIngredient = {
    ingredient: req.body.ingredientId,
    qtyInGrams: req.body.qtyInGrams
  };

  // User.findByIdAndUpdate(userId, 
  //   // { $push: { userIngredients: newUserIngredient } }, // won't be validated in schema to prevent duplicates
  //   // { $addToSet: { userIngredients: newUserIngredient } }, // adds a value to an array unless the value is already present, but does not work in this case because not the same value (object) even if same properties
  //   { new: true })
  //   .populate("userIngredients.ingredient")

  User.findOne({ _id: userId }, { userIngredients: { $elemMatch: { ingredient: { _id: newUserIngredient.ingredient } } } }) // with $elemMatch operator in projection
    .then(response => {
      if (response.userIngredients.length === 0) {
        // throw new Error("Ingredient not found");
        // create the userIngredients
        return User.findByIdAndUpdate(userId, 
          { $push: { userIngredients: newUserIngredient } }, // won't be validated in schema to prevent duplicates
          { new: true })
          .populate("userIngredients.ingredient")
          .then(response => {
            res.status(201).json(response.userIngredients) // CREATED
          })
      } else {
        // // increment the qty
        // // scenario moved to PUT request
        // return User.findByIdAndUpdate(userId, 
        //   { $inc: { "userIngredients.$[elem].qtyInGrams": newUserIngredient.qtyInGrams } }, 
        //   { 
        //     new: true, 
        //     arrayFilters: [{ "elem.ingredient": newUserIngredient.ingredient }] 
        //   })
        //   .populate("userIngredients.ingredient")
        //   .then(response => {
        //     res.status(200).json(response.userIngredients); // OK
        //   })
        res.status(409).json({ // CONFLICT
          message: "conflict creating a new userIngredient: item already exist, to update use PUT verb instead (same endpoint + /userIngredientId)",
          userIngredientId: response.userIngredients[0]._id
        })
      }
    })
    .catch(err => {
      console.log("error creating a new userIngredient", err);
      res.status(500).json({
        message: "error creating a new userIngredient",
        error: err
      });
    })
});

// PUT /api/useruingredients/id
router.put('/user-ingredients/:userIngredientId', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.userIngredientId)) {
    res.status(404).json({ message: 'userIngredient id is not valid' });
    return;
  }

  const newUserIngredient = {
    ingredient: req.body.ingredientId,
    qtyInGrams: req.body.qtyInGrams
  };

  const { userIngredientId } = req.params;
  User.findOneAndUpdate(
    { _id: userId, 'userIngredients._id': userIngredientId },
    { $inc: { 'userIngredients.$.qtyInGrams': newUserIngredient.qtyInGrams } }, // using positional operator
    { new: true }
  )
    .populate("userIngredients.ingredient")
    .then(response => {
        res.status(200).json(response.userIngredients);
      })
    .catch(err => {
      console.log("error updating userIngredient", err);
      res.status(500).json({
        message: "error updating userIngredient",
        error: err
      });
    })
});

// PUT /api/user-ingredients
router.put('/user-ingredients', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  const newUserIngredients = req.body.userIngredients;

  User.findOneAndUpdate(
    { _id: userId },
    { userIngredients: newUserIngredients },
    { new: true, runValidators: true }
  )
    .populate("userIngredients.ingredient")
    .then(response => {
        res.status(200).json(response.userIngredients);
      })
    .catch(err => {
      console.log("error updating userIngredients", err);
      res.status(500).json({
        message: "error updating userIngredients",
        error: err
      });
    })
});

// DELETE /api/user-ingredients/id
router.delete('/user-ingredients/:userIngredientId', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user (routes mounted and protected)
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.userIngredientId)) {
    res.status(404).json({ message: 'userIngredient id is not valid' });
    return;
  }

  const { userIngredientId } = req.params;
  User.findByIdAndUpdate(userId, { $pull: { userIngredients: { _id: userIngredientId } } }, { new: true })
  // User.findByIdAndUpdate(userId, { $pull: { userIngredients: { _id: { $in: [userIngredientId] } } } }, { new: true }) // ok
  
  // User.findByIdAndUpdate(userId, { $pullAll: { userIngredients: [{ _id: userIngredientId }] } }, { new: true })
  // // mentionned here but it doesn't work and it is not indented to work this way
  // // https://stackoverflow.com/questions/5890898/confused-as-to-how-pullall-works-in-mongodb/5894260#5894260
  // // $pullAll works only if values are exact matches and condition operators not allowed, it takes an array, not a document (via a query)
  // User.findOne({ _id: userId }, { userIngredients: { $elemMatch: { _id: userIngredientId } } })
  //   .then(response => {
  //     const userIngredient = response.userIngredients[0];
  //     return User.findByIdAndUpdate(userId, { $pullAll: { userIngredients: [userIngredient] } }, { new: true })
  //       .populate("userIngredients.ingredient")
  //   }) // ok but not efficient codewise...

    .populate("userIngredients.ingredient")

    .then(response => {
      // to do: implement 404 (Not Found)
      res.status(200).json(response.userIngredients);
    })
    .catch(err => {
      console.log("error deleting userIngredient", err);
      res.status(500).json({
        message: "error deleting userIngredient",
        error: err
      });
    })
});

// DELETE /api/user-ingredients/
router.delete('/user-ingredients', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id // fallback to current user (routes mounted and protected)
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  User.findByIdAndUpdate(userId, { $unset: { userIngredients: "" } }, { new: true }) // completely remove the field
  // User.findByIdAndUpdate(userId, { $set: { userIngredients: [] } }, { new: true }) 
    .then(response => res.status(200).json(response.userIngredients))
    .catch(err => {
      console.log("error deleting userIngredients", err);
      res.status(500).json({
        message: "error deleting userIngredients",
        error: err
      });
    })
});

module.exports = router;