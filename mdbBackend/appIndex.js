const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors({ origin: 'http://careerx-fr.s3-website.ap-south-1.amazonaws.com' }));
app.use(cors({ origin: 'http://localhost:4200' }));

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

module.exports=app;
