const express = require('express');
const router = express.Router();
const Print = require('../models/print.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////

// renews original data
router.get('/seed', (req,res)=>{
    Print.collection.drop();
    Print.create([
        {name: "Tempted Fishy", price: 15, imgSrc: "../public/pics/tempted-fishy.png"},
        {name: "Tired Doggy", price: 15, imgSrc: "tired-doggy.png"},
        {name: "Sorry It Was Boring", price: 15, imgSrc: "sorry-it-was-boring.png"},
        {name: "Wake Up You Little Shits", price: 15, imgSrc: "wake-up-you-little-shits.png"},
        {name: "Life of a Fish", price: 15,imgSrc: "life-of-a-fish.png"},
        {name: "It's Nice to Be Invited", price: 15, imgSrc: "its-nice-to-be-invited.png"},
        {name: "Smoking Earth", price: 15,imgSrc: "smoking-earth.png"},
        {name: "I Was Pollinated Today", price: 15, imgSrc: "i-was-pollinated-today.png"},
        {name: "Don't Tell Me Your Name", price: 15, imgSrc: "dont-tell-me-your-name.png"},
        {name: "You Get Me Through", price: 15, imgSrc: "you-get-me-through.png"},
        {name: "Things to Invent", price: 15, imgSrc: "things-to-invent.png"},
        {name: "These Are MY Hands", price: 15, imgSrc: "these-are-my-hands.png"}
    ], (err, data)=>{
        res.redirect('/prints');
    })
});

// display all prints
router.get('/', (req,res) => {
    Print.find({}, (err,prts) => {
        res.render('prints.ejs', {
            prints : prts
        });
    })
});

// create
router.post('/', (req,res) => {
    Print.create(req.body, (err,prod) => {
        res.redirect('/prints/');
    });
});

// new product details
router.get('/new', (req,res) => {
    res.render("new.ejs");
});

// edit
router.get('/:id/edit', (req,res) => {
    Print.findById(req.params.id, (err,pnt) => { 
        res.render('edit.ejs', {
            print: pnt 
        });
    });
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
    Print.findById(req.params.id, (err,pnt) => {
        res.render("show.ejs", {
            print : pnt,
        });
    });
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