const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({user: req.user.id});
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(e, res);
    }
};

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (e) {
        errorHandler(e, res);
    }
};

module.exports.delete = async function (req, res) {
    try {
        await Category.remove({_id: req.params.id});
        await Position.remove({category: req.params.id});
        res.status(200).json({message: "Removed successfully"})
    } catch (e) {
        errorHandler(e, res);
    }
};

module.exports.create = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    });
    try {
        await category.save();
        res.status(201).json(category);
    } catch (e) {
        errorHandler(e, res);
    }
};

module.exports.update = async function (req, res) {
    const update = new Category({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : ''
    });
    try {
        const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, {$set: update}, {new: true});
        res.status(200).json(updatedCategory);
    } catch (e) {
        errorHandler(e, res);
    }
};
