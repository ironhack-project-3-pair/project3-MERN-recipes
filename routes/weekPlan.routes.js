const router = require('express').Router();

const mongoose = require('mongoose');

const WeekPlan = require('../models/WeekPlan.model');

// PUT /api/week-plan
router.put('/week-plan', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }
  console.log(req.body)
  const weekPlanRecipes = {
    dayMonday: [
      req.body.weekPlanRecipes["dayMonday"]?.[0],
      // req.body.weekPlanRecipes["dayMonday"]?.[1] // passing undefined element will results in null in db
    ],
    dayTuersday: [],
    dayWednesday: [],
    dayThursday: [],
    dayFriday: [],
    daySaturday: [],
    daySunday: [],
  }

  const slotsPerDay = 2;
  for (const key in weekPlanRecipes) {
    if (weekPlanRecipes.hasOwnProperty(key)) {
      for (let i = 0; i < slotsPerDay; i++) {
        weekPlanRecipes[key][i] = req.body.weekPlanRecipes[key]?.[i]
      }
    }
  }
  // this will set slots to undefined if no recipe passed 
  // (which will results in null values for corresponding fields of the updated document)
  // const arr = []; arr[1] = 1 // results in arr[0] = undefined
  // so no better option than having null field values

  WeekPlan.findOne({ user: userId })
    .then(weekPlan => {
      if (!weekPlan) {
        res.status(404).json({message: "error updating weekPlan: not found"})
        return;
      }
      // weekPlan.user is an ObjectId from MongoDB, userId is a string from the request
      if (weekPlan.user.toString() !== userId) { // this should not happen...
        res.status(404).json({message: "error updating weekPlan: user not is not the owner of weekPlan"})
        return;
      }
      return WeekPlan.findOneAndUpdate(
        { user: userId }, 
        { weekPlanRecipes: weekPlanRecipes }, 
        { new: true}
      )
    })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log("error updating weekPlan", err);
      res.status(500).json({
        message: "error updating weekPlan",
        error: err
      });
    })
});

// GET /api/week-plan
router.get('/week-plan', (req, res, next) => {
  let { userId } = req.body; // may be used by admin
  if (!userId) userId = req.payload._id; // fallback to current user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ message: 'User id is not valid' });
    return;
  }

  WeekPlan.findOne({ user: userId })
    .then(weekPlan => {
      res.status(201).json(weekPlan)
    })
    .catch(err => {
      console.log("error getting weekPlan", err);
      res.status(500).json({
        message: "error getting weekPlan",
        error: err
      });
    })
});

module.exports = router;