const { Schema, model } = require("mongoose");

const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },

    userIngredients: {
      type: [
        {
            ingredient: {
                type: Schema.Types.ObjectId, 
                ref: 'Ingredient',
                required: true,
                // unique: true // does not work to prevent duplicate ingredients, it enforces uniqueness across different documents only
            }, 
            qtyInGrams: {
                type: Number,
                required: true,
                min: 0
            }
        },
      ],
      // default: undefined // results in userIngredients: null
      // default: [] // results in userIngredients: undefined
      validate: {
        // return false or throwing an error means validation failed
        validator: function(userIngredients) {
          // if (this instanceof mongoose.Document) { // document validator
          //   console.log("mongoose.Document");
          //   console.log(this.userIngredients);
          // } else if (this instanceof mongoose.Query) { // update validator
          //   console.log("mongoose.Query");
          //   console.log(this.get('userIngredients'));
          //   // $push, $addToSet, $pull, and $pullAll validation does not run any validation on the array itself, 
          //   // only individual elements of the array
          //   // so in this case, userIngredients contains only the updated elements, not the updated array
          //   // https://mongoosejs.com/docs/validation.html#update-validators
          //   // https://mongoosejs.com/docs/validation.html#update-validators-and-this
          //   // https://mongoosejs.com/docs/validation.html#update-validators-only-run-on-updated-paths
          //   // https://mongoosejs.com/docs/validation.html#update-validators-only-run-for-some-operations
          // } else { // bug??? happens with FindOneAndUpdate + $push
          //   console.log("validator else")
          //   // console.log(this)
          //   // <ref *1> Object [global] {
          //   //   global: [Circular *1],
          //   // this is NodeJS global object with a circular reference (node repl)
          //   // console.log(JSON.stringify(this))
          //   // CONCLUSION: not possible to access the updated array with FindOneAndUpdate + $push to check for duplicates in the updated array
          // }
          for (let i = 0; i < userIngredients.length; i++) {
            const duplicates = userIngredients.filter(userIngredient => {
              return userIngredient.ingredient._id.toString() === userIngredients[i].ingredient._id.toString()
              // .toString() important!
          })
          if (duplicates.length > 1) {
            return false;
            }
          }
          return true;
        },
        message: 'duplicate ingredient'
      }
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;