const Trainers = require("../models/Trainers");

const getAllTrainers = async (req, res) => {
    const trainers = await Trainers.find({});
    res.status(200).json({
        trainers,
        success: true,
        message: `${req.method} - request to Trainer endpoint`
    });
}

const getTrainerByName = async (req, res) => {
    const name = req.params.id;
    const trainer = await Trainers.findOne({name});
    res.status(200).json({
        trainer,
        success: true,
        message: `${req.method} - request to Trainer endpoint`
    });
};

const createTrainer = async (req, res) => {
    const {trainer} = req.body;
    const newTrainer = await Trainers.create(trainer);
    console.log("data >>>", newTrainer);
    res.status(200).json({
        newTrainer,
        success: true,
        message: `${req.method} - request to Trainer endpoint`
    });
}

const updateTrainer = async (req, res) => {
    const name = req.params.id;
    const trainer = await Trainers.findOneAndUpdate({name}, req.body, {new: true});
    res.status(200).json({
        trainer,
        success: true,
        message: `${req.method} - request to Trainer endpoint`
    });
};

const deleteTrainer = async (req, res) => {
    const name = req.params.id;
    const trainer = await Trainers.deleteOne({name});
    res.status(200).json({
        trainer,
        success: true,
        message: `${req.method} - request to Trainer endpoint`
    });
};

module.exports = {
    getAllTrainers,
    getTrainerByName,
    createTrainer,
    updateTrainer,
    deleteTrainer,
}