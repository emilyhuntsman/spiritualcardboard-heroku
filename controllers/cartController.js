const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.js');
const Print = require('../models/print.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////

// display cart
router.get('/', (req,res) => {
    Cart.create([{idArray: []} ], (err, data)=>{
        res.redirect('/prints');
    })
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

// // update from edit page
// router.put('/:id', (req,res) => {
//     Cart.findOneAndUpdate(req.params.id,req.body,{new:true},(err,updated) => {
//         res.redirect('/prints/'+req.params.id);
//     });
// });

// // delete
// router.delete('/:id', (req, res)=>{
//     Cart.findOneAndUpdate({},{$pull: { idArray : {$elemMatch : {_id : req.params.id}}}},{new: true},(err, data)=>{
//         res.redirect('/cart/');
//     });
// });

// // new product details
// router.get('/new', (req,res) => {
//     res.send("new print admin");
//     // res.render("new.ejs");
// });


module.exports = router;