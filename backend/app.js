const express = require('express');

require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const path = require('path');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3000;

const routes = require('./routes/index.js');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректные данные' });
  } else if (err.statusCode === 409 || err.statusCode === 404 || err.statusCode === 401) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
