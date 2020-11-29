const Card = require('../models/card');

const NotFoundError = require('../errors/notFoundError');
const Forbidden = require('../errors/forbidden');

module.exports.readCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    res.send(card);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user });
    res.send({ data: card });
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const cardForDelete = await Card.findById({ _id });
    if (cardForDelete === null) {
      throw new NotFoundError('Нет карточки с таким id');
    } else if (req.user._id !== cardForDelete.owner.toString()) {
      throw new Forbidden('Карточку создал другой пользователь');
    }
    const card = await Card.findOneAndRemove({ _id });
    res.status(200).send(card);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Нет карточки с таким id');
    }
    res.status(200).send(card);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params._id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Нет карточки с таким id');
    }
    res.status(200).send(card);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};
