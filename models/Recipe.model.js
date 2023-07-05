const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required. Please provide a valid name'],
    unique: true,
  },
  instructions: String,
  durationInMin: Number,
  recipeIngredients: {
    type: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
          validate: {
            validator: function (ingredientInputValue) {
              return ingredientInputValue != null && ingredientInputValue != '';
            },
            message:
              "Ingredient's name is required. Please provide valid ingredient",
          },
        },
        qtyInGrams: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    validate: [ingredientsLimit, '{PATH} needs to have at least 1 ingredient'],
  },
  picture: {
    type: String,
  },
});

// Validate number of ingredients of created Recipe
function ingredientsLimit(recipeIngredients) {
  return recipeIngredients.length > 0;
}

module.exports = model('Recipe', recipeSchema);
