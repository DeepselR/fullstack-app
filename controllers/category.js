module.exports.getAll = function(req, res) {
  res.status(200).json({
    categories: [
      {
        id: 1
      },
      {
        id: 2
      }
    ]
  });
};

module.exports.getById = function(req, res) {};

module.exports.delete = function(req, res) {};

module.exports.create = function(req, res) {};

module.exports.update = function(req, res) {};
