const Pokemon = require("../models/Pokemon");

const getAllPokemon = async (req, res) => {
    const pokemon = await Pokemon.find({});
    res.status(200).json({
        pokemon,
        success: true,
        message: `${req.method} - request to Author endpoint`
    });
}

const getPokemonByName = (req, res) => {
    const {name} = req.params;
    res.status(200).json({
        name,
        success: true,
        message: `${req.method} - request to Author endpoint`
    });
};

const createPokemon = async (req, res) => {
    const {pokemon} = req.body;
    const newPokemon = await Pokemon.create(pokemon);
    console.log("data >>>", newPokemon);
    res.status(200).json({
        success: true,
        message: `${req.method} - request to Author endpoint`
    });
}

const updatePokemon = async (req, res) => {
    const {name} = req.params;
    const { pokemon } = await Authors.findByIdAndUpdate(name, req.body, {new: true});
    res.status(200).json({
        pokemon,
        success: true,
        message: `${req.method} - request to Author endpoint`
    });
};

const deletePokemon = (req, res) => {
    const {name} = req.params;
    res.status(200).json({
        name,
        success: true,
        message: `${req.method} - request to Author endpoint`
    });
};

module.exports = {
    getAllPokemon,
    getPokemonByName,
    createPokemon,
    updatePokemon,
    deletePokemon,
}