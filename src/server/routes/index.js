const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./policies'));
app.use(require('./clients'));

module.exports = app;
