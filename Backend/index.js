const express = require('express');
var cors = require('cors');
const userRoutes = require('./routes/userRoute');
const persakaRoutes = require('./routes/persakaRoute');
const programRoutes = require('./routes/programRoute');
const businessRoutes = require('./routes/businessRoute');
const surveyRoutes = require('./routes/surveyRoute');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoutes);
app.use('/persaka', persakaRoutes);
app.use('/program', programRoutes);
app.use('/business', businessRoutes);
app.use('/survey', surveyRoutes);

module.exports = app;