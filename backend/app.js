const express = require('express');

require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3000;
const routes = require('./routes/index.js');

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
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
