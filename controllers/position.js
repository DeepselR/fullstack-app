const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user
        });
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(e, res);
    }
};
module.exports.create = function (req, res) {
    try {

    } catch (e) {
        errorHandler(e, res);
    }

};
module.exports.delete = function (req, res) {
    try {

    } catch (e) {
        errorHandler(e, res);
    }

};
module.exports.update = function (req, res) {
    try {

    } catch (e) {
        errorHandler(e, res);
    }

};
