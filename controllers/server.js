// dependencies
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const printController = require('./printController.js');
const cartController = require('./cartController.js');
const app = express();
const port = process.env.PORT || 3000;
const Cart = require('../models/cart.js');
const bodyParser = require("body-parser");
const { $where } = require('../models/cart.js');

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use('/prints', printController);
app.use('/cart',cartController);
app.use(methodOverride('_method'));

// server setup
db = mongoose.connection;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spiritual_cardboard';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('The connection with mongod is established')
});
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))


///////////////////////////////////////////////////

// base route
app.get('/', (req,res) => {
    Cart.findOne({}).populate('idArray').then( (found) => {
        res.render('index.ejs', {
            cart : found.idArray,
            route: "_"
        });
    });
});

app.get('/widgets', (req,res) => {
    Cart.findOne({}).populate('idArray').then( (found) => {
        res.render('widgets.ejs', {
            cart : found.idArray,
            route: "_widgets"
        });
    });
});

// listening on 3000
app.listen(port, () => {
    console.log("listening");
});
