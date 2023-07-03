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

  // const weekPlanRecipes = req.body.weekPlanRecipes // just to test schema validators
  const weekPlanRecipes = {
    dayMonday: [
      // passing undefined element will results in null in db
      // req.body.weekPlanRecipes["dayMonday"]?.[0],
      // req.body.weekPlanRecipes["dayMonday"]?.[1]
    ],
    dayTuesday: [],
    dayWednesday: [],
    dayThursday: [],
    dayFriday: [],
    daySaturday: [],
    daySunday: [],
  }
  
  // rebuild the week plan from req.body
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
        res.status(404).json({message: "error updating weekPlan: user is not the owner of the weekPlan"})
        return;
      }
      // return WeekPlan.findOneAndUpdate(
      //   { user: userId }, 
      //   { weekPlanRecipes: weekPlanRecipes }, 
      //   { new: true, runValidators: true })
      //   .populate("weekPlanRecipes.dayMonday")
      //   .populate("weekPlanRecipes.dayTuesday")
      //   .populate("weekPlanRecipes.dayWednesday")
      //   .populate("weekPlanRecipes.dayThursday")
      //   .populate("weekPlanRecipes.dayFriday")
      //   .populate("weekPlanRecipes.daySaturday")
      //   .populate("weekPlanRecipes.daySunday")
      const promiseBasedQuery = WeekPlan.findOneAndUpdate(
        { user: userId }, 
        { weekPlanRecipes: weekPlanRecipes }, 
        { new: true, runValidators: true })
      const days = [
        "dayMonday",
        "dayTuesday",
        "dayWednesday",
        "dayThursday",
        "dayFriday",
        "daySaturday",
        "daySunday"
      ]
      days.forEach(day => promiseBasedQuery.populate(`weekPlanRecipes.${day}`))
      return promiseBasedQuery
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

  // note: there is a `strictPopulate` option
  const promiseBasedQuery = WeekPlan.findOne({ user: userId })
  const days = [
    "dayMonday",
    "dayTuesday",
    "dayWednesday",
    "dayThursday",
    "dayFriday",
    "daySaturday",
    "daySunday"
  ]
  days.forEach(day => promiseBasedQuery.populate(`weekPlanRecipes.${day}`))
  promiseBasedQuery
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