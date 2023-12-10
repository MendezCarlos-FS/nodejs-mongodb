const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    ownedPokemon: Array
});

module.exports = mongoose.model('Trainer', trainerSchema);