// dependencies
const express = require('express');
const app = express();
app.use(express.static("public"));

// const Product = require('../models/product.js');
// const User = require('../models/user.js');
const mongoose = require('mongoose');
//const productSeed = require('../models/seed.js');
const methodOverride = require('method-override');

const port = 3000;
const printController = require('./printController.js');
app.use('/prints', printController);
const cartController = require('./cartController.js');
app.use('/cart',cartController);

// middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// server setup
db = mongoose.connection;
const mongoURI = 'mongodb://localhost:27017/spiritual_cardboard';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('The connection with mongod is established')
});
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/widgets', (req,res) => {
    res.send('widget!!');
});

app.listen(port, () => {
    console.log("listening");
});