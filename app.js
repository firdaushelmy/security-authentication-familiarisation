//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(`${MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = new mongoose.model('User', userSchema);

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });
    newUser.save(function (err) {
      if (!err) {
        res.render('secrets')
        return;
      };
      console.log(err)
    });
  });

})

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({ email: username }, function (err, foundUser) {
    if (foundUser) {
      if (foundUser.password === password) {
        res.render('secrets');
        return;
      } console.log('email or password does not match');
      return;
    }
    console.log('error: ' + err)
  })
})


const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`server is running on ${port}`)
});

