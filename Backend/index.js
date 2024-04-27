const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const programRoutes = require('./routes/program');
const userRoutes = require('./routes/user');
const persakaRoutes = require('./routes/persaka');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/program', programRoutes.router);
app.use('/user', userRoutes);
app.use('/persaka', persakaRoutes);

module.exports = app;