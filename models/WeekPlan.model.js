const { Schema, model } = require("mongoose");

const slotsPerDay = 2;
const customValidator = (v, slotsPerDay) => {
  return v.length <= slotsPerDay;
}

const weekPlanSchema = new Schema(
  { user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
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