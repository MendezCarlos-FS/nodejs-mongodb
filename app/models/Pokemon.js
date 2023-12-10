const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    name: String,
    level: Number,
    abilities: Array,
    shiny: Boolean
});

module.exports = mongoose.model('Pokemon', pokemonSchema);