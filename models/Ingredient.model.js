const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid title"],
        unique: true
        }
});

module.exports = model('Ingredient', ingredientSchema);