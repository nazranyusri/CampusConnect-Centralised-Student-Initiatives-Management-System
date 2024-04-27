const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const programRoutes = require('./routes/programRoute');
const userRoutes = require('./routes/userRoute');
const persakaRoutes = require('./routes/persakaRoute');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/program', programRoutes);
app.use('/user', userRoutes);
app.use('/persaka', persakaRoutes);

module.exports = app;