const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    bcrypt.compare(req.body.password, candidate.password).then(isSame => {
      if (isSame) {
        //Генерация токена
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id
          },
          keys.jwt,
          { expiresIn: 3600 }
        );

        res.status(200).json({
          token: `Bearer ${token}`
        });
      } else {
        res.status(401).json({
          message: "Пароли не совпадают"
        });
      }
    });
  } else {
    res.status(404).json({
      message: "Пользователь с таким email не найден"
    });
  }
};

module.exports.register = async function(req, res) {
  //email password
  const candidate = await User.findOne({ email: req.body.email });

  console.log(candidate);
  if (candidate) {
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
