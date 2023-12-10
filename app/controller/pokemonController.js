const Pokemon = require("../models/Pokemon");

const getAllPokemon = async (req, res) => {
    const pokemon = await Pokemon.find({});
    res.status(200).json({
        pokemon,
        success: true,
        message: `${req.method} - request to Pokemon endpoint`
    });
}

const getPokemonByName = async (req, res) => {
    const name = req.params.id;
    const pokemon = await Pokemon.findOne({name: name});
    res.status(200).json({
        pokemon,
        success: true,
        message: `${req.method} - request to Pokemon endpoint`
    });
};

const createPokemon = async (req, res) => {
    const {pokemon} = req.body;
    const newPokemon = await Pokemon.create(pokemon);
    console.log("data >>>", newPokemon);
    res.status(200).json({
        success: true,
        message: `${req.method} - request to Pokemon endpoint`
    });
}

const updatePokemon = async (req, res) => {
    const name = req.params.id;
    const pokemon = await Pokemon.findOneAndUpdate({name}, req.body, {new:true});
    res.status(200).json({
        pokemon,
        success: true,
        message: `${req.method} - request to Pokemon endpoint`
    });
};

const deletePokemon = async (req, res) => {
    const name = req.params.id;
    const pokemon = await Pokemon.findOneAndDelete({name: name});
    res.status(200).json({
        pokemon,
        success: true,
        message: `${req.method} - request to Pokemon endpoint`
    });
};

module.exports = {
    getAllPokemon,
    getPokemonByName,
    createPokemon,
    updatePokemon,
    deletePokemon,
}