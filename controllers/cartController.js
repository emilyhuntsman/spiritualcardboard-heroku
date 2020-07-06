const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////

// empties cart
router.get('/seed', (req,res)=>{
    Cart.collection.drop();
});

// display cart
router.get('/', (req,res) => {
    res.send("cart display");
    // Product.find({}, (err,prods) => {
    //     res.render('cart.ejs', {
    //         products : prods
    //     });
    // })
});

// create (add to cart)
router.put('/', (req,res) => {
    // Print.create(req.body, (err,prod) => {
    // });
    res.redirect('/cart/');
});

// // can't get the query to remove from shopping cart to work..
router.get('/remove/:id', (req,res) => {
    Cart.findOneAndUpdate({},{$pull: { idArray : {$elemMatch : {_id : req.params.id}}}}, {new: true}, (err,cart) => {
        console.log("deleting.. ");
        for (let i=0; i< cart.idArray.length; i++){
            console.log(cart.idArray[i]);
        }
        res.redirect('/');
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