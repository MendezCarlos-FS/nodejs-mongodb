const Trainers = require("../models/Trainers");

const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainers.find({});
        res.status(200).json({
            trainers,
            success: true,
            message: `Showing all existing trainers`
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getTrainerByName = async (req, res) => {
    const name = req.params.id;
    try {
        const trainer = await Trainers.findOne({name});

        const statusCode = trainer ? 200 : 404;
        const message = statusCode === 200 ? "Found trainer" : "Could not find trainer";
        res.status(statusCode).json({
            trainer,
            success: trainer ? true : false,
            message
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const createTrainer = async (req, res) => {
    const {trainer} = req.body;
    try {
        const newTrainer = await Trainers.create(trainer);
        // 201 indicates successful creation
        res.status(201).json({
            trainer: newTrainer,
            success: true,
            message: `Successfully created trainer`
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
                message: "This trainer already exists.",
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

const updateTrainer = async (req, res) => {
    try {
        const name = req.params.id;
        const trainer = await Trainers.findOneAndUpdate({name}, req.body, {new:true, runValidators:true});

        const statusCode = trainer ? 200 : 404;
        const message = statusCode === 200 ? "Trainer updated successfully" : "Could not find trainer";
        res.status(statusCode).json({
            trainer,
            success: trainer ? true : false,
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

const deleteTrainer = async (req, res) => {
    try {
        const name = req.params.id;
        const trainer = await Trainers.findOneAndDelete({name: name});

        const statusCode = trainer ? 200 : 404;
        const message = statusCode === 200 ? "Successfully deleted trainer" : "Could not find trainer"
        res.status(statusCode).json({
            trainer,
            success: trainer ? true : false,
            message
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = {
    getAllTrainers,
    getTrainerByName,
    createTrainer,
    updateTrainer,
    deleteTrainer,
}