const express = require('express');
const router = express.Router();
const Print = require('../models/print.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////

// renews original data
// router.get('/seed', (req,res)=>{
//     Product.collection.drop();
//     Product.create([
//     ], (err, data)=>{
//         res.redirect('/products');
//     })
// });

// display all prints
router.get('/', (req,res) => {
    res.send("prod display");
    // Product.find({}, (err,prods) => {
    //     res.render('index.ejs', {
    //         products : prods
    //     });
    // })
});

// create
router.post('/', (req,res) => {
    Print.create(req.body, (err,prod) => {
        res.redirect('/prints/');
    });
});

// move to cart controller
// // show user's cart
// router.get('/cart', (req,res) => {
//     User.findOne({username: "user1"},(err,user) => {
//         res.render("cart.ejs", {
//             cart : user.shopping_cart
//         });
//     });
// });

// // show user's cart
// // can't get the query to remove from shopping cart to work..
// router.get('/cart/remove/:id', (req,res) => {
//     User.findOneAndUpdate({username: "user1"},{$pull: { shopping_cart : {$elemMatch : {_id : req.params.id}}}}, {new: true}, (err,user) => {
//         console.log("deleting.. ");
//         for (let i=0; i< user.shopping_cart.length; i++){
//             console.log(user.shopping_cart[i].name);
//         }
//         // does not seem to update the items in cart
//     });
//     res.redirect('/products/cart');
// });


// new product details
router.get('/new', (req,res) => {
    res.send("new print admin");
    // res.render("new.ejs");
});

// edit
router.get('/:id/edit', (req,res) => {
    res.send("admin edit page: ");
    // Product.findById(req.params.id, (err,prod) => { 
    //     res.render('edit.ejs', {
    //         product: prod 
    //     });
    // });
});

// buy button
router.get('/:id/buy', (req,res) => {
    res.send("will buy: ");
    // Product.findByIdAndUpdate(req.params.id, {$inc: {qty: -1}}, {new:true}, (err,updated) => {
    //     User.findOneAndUpdate({username: "user1"}, {$push: {"shopping_cart": updated}}, {new:true}, (err,pushed) => {
    //         console.log("inside cart ",pushed.shopping_cart);
    //     });
    // });
    // User.findOne({username: "user1"}, (err, found) => {
    //     console.log("cart ",found.shopping_cart);
    // }); 
    // res.redirect('/products/'+req.params.id);
});

// show page
router.get('/:id', (req,res) => {
    res.send("prod show page");
    // Product.findById(req.params.id, (err,prod) => {
    //     res.render("show.ejs", {
    //         product : prod,
    //     });
    // });
});

// update from edit page
router.put('/:id', (req,res) => {
    Print.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updated) => {
        res.redirect('/prints/'+req.params.id);
    });
});

// delete
router.delete('/:id', (req, res)=>{
    Print.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/prints/');
    });
});


module.exports = router;