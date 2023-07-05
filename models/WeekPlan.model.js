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
      // dayMonday: {
      //   type: [Schema.Types.ObjectId], 
      //   ref: 'Recipe',
      //   required: true,

      //   validate: [{ // 2 syntax: array of 1 object or object; same behavior, validator runs once and receive the entire array in this case (whole array update, not using an $operator)
      //     validator: function (v) {
      //       return v.length <= slotsPerDay;
      //     },
      //     message: 'only 2 recipe slots available per day in Week Plan',
      //   }],
      //   // validate: {
      //   //   validator: function (v) {
      //   //     return customValidator(v, slotsPerDay); // not much shorter...
      //   //   },
      //   //   message: 'only 2 recipe slots available per day in Week Plan',
      //   // },
      // },
      // changed to add consumed state --> weekPlan v consumed

      dayMonday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        // default: [{}, {}] 
        // easier with this default in the end to always have the exact same layout for the document
        // because without it, day's field value was empty array: dayMonday = [] before the first update
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
      dayTuesday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
      dayWednesday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
      dayThursday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
      dayFriday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
      daySaturday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
      daySunday: {
        type: [
          {
            recipe: {
              type: Schema.Types.ObjectId, 
              ref: 'Recipe',
            },
            consumed: {
              type: Boolean,
              default: false,
            }
          }
        ],
        required: true,
        validate: {
          validator: function (v) {
            return v.length <= slotsPerDay;
          },
          message: 'only 2 recipe slots available per day in Week Plan',
        },
        default: function() {
          return Array(slotsPerDay).fill({});
        }
      },
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const WeekPlan = model("WeekPlan", weekPlanSchema);

module.exports = WeekPlan;