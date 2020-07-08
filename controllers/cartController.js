const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.js');
const Print = require('../models/print.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////

// Cart.create([{idArray: []} ], (err, data)=>{
//     res.redirect('/prints');
// })
// create seed?

// display cart
router.get('/', (req,res) => {
    Cart.findOne({}).populate('idArray').then( (found) => {
        res.render('checkout.ejs', {
            cart : found.idArray
        });
    });
});


// delete item from cart
router.get('/remove/:id', (req,res) => {
    Cart.findOneAndUpdate({},{$pull: { idArray : req.params.id}}, {new: true}, (err,cart) => {
        res.redirect('/cart/');
    });
});

// add item to cart
router.get('/add/:id', (req,res) => {
    Cart.findOneAndUpdate({},{$push: { idArray : req.params.id}}, {new: true}, (err,cart) => {
        res.redirect('/prints/'+req.params.id);
    });
});

module.exports = router;