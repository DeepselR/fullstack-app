const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  });
};

module.exports.register = async function(req, res) {
  //email password
  const canditate = await User.findOne({ email: req.body.email });

  console.log(canditate);
  if (canditate) {
    //Пользователь существует, выдает ошибку
    res.status(409).json({
      message: "Пользователь с таким email уже сущуствует"
    });
  } else {
    // Проводим регистрацию
    bcrypt.genSalt(10, function(err, salt) {
      const password = req.body.password;
      bcrypt.hash(password, salt, async function(err, hash) {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        try {
          await user.save();
          res.status(201).json(user);
        } catch (e) {
          console.log("Ошибка в auth.js save user to db");
        }
      });
    });
  }
};
