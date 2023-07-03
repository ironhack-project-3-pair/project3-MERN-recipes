const { Schema, model } = require("mongoose");

const slotsPerDay = 2;
// const customValidator = (v, slotsPerDay) => {
//   return v.length <= slotsPerDay;
// }

const weekPlanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    weekPlanRecipes: {
      dayMonday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,

        validate: [{ // 2 syntax: array of 1 object or object; same behavior, validator runs once and receive the entire array in this case (whole array update, not using an $operator)
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        }],
        // validate: {
        //   validator: function (v) {
        //     return customValidator(v, slotsPerDay); // not much shorter...
        //   },
        //   message: 'only 2 recipe slots available per day in Week Plan',
        // },
      },
      dayTuesday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
      },
      dayWednesday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
      },
      dayThursday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
      },
      dayFriday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
      },
      daySaturday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
      },
      daySunday: {
        type: [Schema.Types.ObjectId], 
        ref: 'Recipe',
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
      }
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const WeekPlan = model("WeekPlan", weekPlanSchema);

module.exports = WeekPlan;