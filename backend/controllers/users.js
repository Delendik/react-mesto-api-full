require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkError = require('../errors/checkError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

module.exports.readUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    console.log('err = ', err.message);
    checkError(err, res);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  } catch (err) {
    console.log('err = ', err.message);
    // eslint-disable-next-line no-unused-expressions
    err.statusCode ? next(err) : checkError(err, res);
  }
};

module.exports.readUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  } catch (err) {
    console.log('err = ', err.message);
    // eslint-disable-next-line no-unused-expressions
    err.statusCode ? next(err) : checkError(err, res);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    const existUser = await User.findOne({ email }).select('+password');
    console.log(existUser);
    if (existUser) {
      throw new ConflictError('Пользователь с таким email уже существует');
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        name, about, avatar, email, password,
      });
      res.send({ data: user });
    }
  } catch (err) {
    console.log('err = ', err.message);
    // eslint-disable-next-line no-unused-expressions
    err.statusCode ? next(err) : checkError(err, res);
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
  } catch (err) {
    console.log('err = ', err.message);
    checkError(err, res);
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
  } catch (err) {
    console.log('err = ', err.message);
    checkError(err, res);
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
