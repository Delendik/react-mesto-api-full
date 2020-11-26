require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const InvalidData = require('../errors/invalidData');

module.exports.readUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
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
    next(err);
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
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new ConflictError('Пользователь с таким email уже существует');
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      const { _id } = await User.create({
        name, about, avatar, email, password,
      });
      res.send({
        name, about, avatar, email, _id,
      });
    }
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      });
    res.send({ data: user });
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.updateAvatarInfo = async (req, res, next) => {
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
    next(err);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidData('Неверный пользователь');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new InvalidData('Неверный пароль');
          }

          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
