const checkError = (error, res) => {
  if (error.name === 'CastError' || error.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректные данные' });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports = checkError;
