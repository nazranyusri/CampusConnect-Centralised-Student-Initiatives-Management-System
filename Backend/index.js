const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const programRoutes = require('./routes/program');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/program', programRoutes);

module.exports = app;