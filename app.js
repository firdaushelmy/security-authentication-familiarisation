//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const mongoose = require('mongoose');
// require('dotenv').config()
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3000;
// const MONGO_URL = process.env.MONGO_URL
// mongoose.connect(`${MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(port, function () {
  console.log(`server is running on ${port}`)
});