const express = require('express');
var cors = require('cors');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoute');
const persakaRoutes = require('./routes/persakaRoute');
const programRoutes = require('./routes/programRoute');
const businessRoutes = require('./routes/businessRoute');
const surveyRoutes = require('./routes/surveyRoute');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/webhook', businessRoutes);
app.use(express.json());
app.use('/user', userRoutes);
app.use('/persaka', persakaRoutes);
app.use('/program', programRoutes);
app.use('/business', businessRoutes);
app.use('/survey', surveyRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;