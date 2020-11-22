const express = require('express');

require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

const PORT = 3000;
const routes = require('./routes/index.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5fba6ce33991143590ca07ed',
//   };

//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
