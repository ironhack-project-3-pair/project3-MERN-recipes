const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid title"],
        unique: true
    },
    emoji: {
        type: String,
        // maxLength: 2, // validator // emojis can even be longer with modifiers and sequences
        match: /^\p{Emoji_Presentation}?$/u // unicode character class escape with property + u flag
    },

    // num: {
    //     type: Number // becomes Int32 in MongoDB
    // }
});

module.exports = model('Ingredient', ingredientSchema);