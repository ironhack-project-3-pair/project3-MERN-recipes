const { Schema, model } = require("mongoose");

const slotsPerDay = 2;
const customValidator = (v, slotsPerDay) => {
  return v.length <= slotsPerDay;
}

const weekPlanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    weekPlanRecipes: {
      dayMonday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        // validate: {
        //   validator: function (v) {
        //     return customValidator(v, slotsPerDay); // not much shorter...
        //   },
        //   message: 'only 2 recipe slots available per day in Week Plan',
        // },

        // default: []
      },
      dayTuersday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: []
      },
      dayWednesday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: []
      },
      dayThursday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: []
      },
      dayFriday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: []
      },
      daySaturday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: []
      },
      daySunday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
              required: true
            }
          }
        ],
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: []
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