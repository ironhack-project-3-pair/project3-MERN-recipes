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
    recipeIngredients: {
        type: [
            {
                ingredient: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Ingredient',
                    required: true
                }, 
                qtyInGrams: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    picture: {
        type: String
    }
});

module.exports = model('Recipe', recipeSchema);