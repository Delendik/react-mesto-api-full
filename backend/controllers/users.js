require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkError = (error, res) => {
  if (error.name === 'CastError' || error.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректные данные' });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.readUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { _id } = req.user;
    // console.log(req.user);
    const user = await User.findById({ _id });
    // console.log(req.user);
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    checkError(error, res);
  }
};

module.exports.readUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    checkError(error, res);
  }
};

// module.exports.readUser = async (req, res) => {
//   try {
//     // const { email } = req.params;
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) {
//       res.status(404).send({ message: 'Нет пользователя с таким email' });
//       return;
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     console.log(error);
//     checkError(error, res);
//   }
// };

module.exports.createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name, about, avatar, email, password,
    });
    res.send({ data: user });
  } catch (error) {
    console.log(error);
    checkError(error, res);
  }
};

module.exports.updateUserInfo = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name },
      {
        new: true,
        runValidators: true,
        upsert: true,
      });
    res.send({ data: user });
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.updateAvatarInfo = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      });
    res.send({ data: user });
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
