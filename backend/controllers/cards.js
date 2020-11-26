const Card = require('../models/card');

const NotFoundError = require('../errors/notFoundError');

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
    const cardForDelete = await Card.find({ _id });
    if (req.user._id !== cardForDelete[0].owner.toString()) {
      throw new NotFoundError('Карточку создал другой пользователь');
    }
    const card = await Card.findOneAndRemove({ _id });
    if (!card) {
      throw new NotFoundError('Нет карточки с таким id');
    }
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
