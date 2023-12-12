const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must specify a name."],
        trim: true,
        unique: [true, "You can only have one trainer of that name."],
    },
    age: Number,
    ownedPokemon: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Pokemon"
    }

});

module.exports = mongoose.model('Trainer', trainerSchema);