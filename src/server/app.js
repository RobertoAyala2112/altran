const express = require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errors');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', require('./routes/index'));

app.use(errorHandler);

module.exports = app;
