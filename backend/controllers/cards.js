const Card = require('../models/card');

const checkError = (error, res) => {
  if (error.name === 'CastError' || error.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректные данные' });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.readCards = async (req, res) => {
  try {
    const card = await Card.find({});
    res.send(card);
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    // const card = await Card.create({ name, link, owner: req.user._id });
    const card = await Card.create({ name, link, owner: req.user });
    res.send({ data: card });
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const { _id } = req.params;
    const card = await Card.findOneAndRemove({ _id });
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params._id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  } catch (error) {
    console.log('err = ', error.message);
    checkError(error, res);
  }
};
