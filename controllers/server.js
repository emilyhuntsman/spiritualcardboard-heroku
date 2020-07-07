// dependencies
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const printController = require('./printController.js');
const cartController = require('./cartController.js');
const app = express();
const port = 3000;

// middleware
app.use(express.static("public"));
app.use('/prints', printController);
app.use('/cart',cartController);
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

// base routes
app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/widgets', (req,res) => {
    res.render('sketch.ejs');
});

// listening on 3000
app.listen(port, () => {
    console.log("listening");
});