const Pokemon = require("../models/Pokemon");

const getAllPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.find({});
        res.status(200).json({
            pokemon,
            success: true,
            message: `Showing all existing Pokemon`
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getPokemonByName = async (req, res) => {
    const name = req.params.id;
    try {
        const pokemon = await Pokemon.findOne({name: name});

        const statusCode = pokemon ? 200 : 404;
        const message = statusCode === 200 ? "Found Pokemon" : "Could not find Pokemon";
        res.status(statusCode).json({
            pokemon,
            success: pokemon ? true : false,
            message
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const createPokemon = async (req, res) => {
    const {pokemon} = req.body;
    try {
        const newPokemon = await Pokemon.create(pokemon);
        // 201 indicates successful creation
        res.status(201).json({
            pokemon: newPokemon,
            success: true,
            message: `Successfully created Pokemon`
        });
    } catch(error) {
        // If validation was unsuccessful, return a 422 status code
        if (error.name === "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        }
        // If there is a duplicate entry, mongo returns a code 11000
        else if (error.code === 11000) {
            console.error(error);
            res.status(409).json({
                message: "This Pokemon already exists.",
                error
            });
        }
        // Else, return a status code 500
        else {
            console.error(error);
            res.status(500).json(error);
        }
    }
}

const updatePokemon = async (req, res) => {
    try {
        const name = req.params.id;
        const pokemon = await Pokemon.findOneAndUpdate({name}, req.body, {new:true, runValidators:true});

        const statusCode = pokemon ? 200 : 404;
        const message = statusCode === 200 ? "Pokemon updated successfully" : "Could not find Pokemon";
        res.status(statusCode).json({
            pokemon,
            success: pokemon ? true : false,
            message
        });
    } catch(error) {
        if (error.name === "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const deletePokemon = async (req, res) => {
    try {
        const name = req.params.id;
        const pokemon = await Pokemon.findOneAndDelete({name: name});

        const statusCode = pokemon ? 200 : 404;
        const message = statusCode === 200 ? "Successfully deleted Pokemon" : "Could not find Pokemon"
        res.status(statusCode).json({
            pokemon,
            success: pokemon ? true : false,
            message
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = {
    getAllPokemon,
    getPokemonByName,
    createPokemon,
    updatePokemon,
    deletePokemon,
}