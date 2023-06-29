const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid name"],
        unique: true
        },
    instructions: String,
    durationInMin: Number,
    recipeIngredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId, 
                ref: 'Ingredient'
            }, 
            qtyInGrams: Number
        }
    ]
});

module.exports = model('Recipe', recipeSchema);