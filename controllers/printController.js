const express = require('express');
const router = express.Router();
const Print = require('../models/print.js');
const Cart = require('../models/cart.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////

// renews original data
router.get('/seed', (req,res)=>{
    Print.collection.drop();
    Print.create([
        {name: "Tempted Fishy", price: 15, imgSrc: "/pics/tempted-fishy.png"},
        {name: "Tired Doggy", price: 15, imgSrc: "/pics/tired-doggy.png"},
        {name: "Sorry It Was Boring", price: 15, imgSrc: "/pics/sorry-it-was-boring.png"},
        {name: "Wake Up You Little Shits", price: 15, imgSrc: "/pics/wake-up-you-little-shits.png"},
        {name: "Life of a Fish", price: 15,imgSrc: "/pics/life-of-a-fish.png"},
        {name: "It's Nice to Be Invited", price: 15, imgSrc: "/pics/its-nice-to-be-invited.png"},
        {name: "Smoking Earth", price: 15,imgSrc: "/pics/smoking-earth.png"},
        {name: "I Was Pollinated Today", price: 15, imgSrc: "/pics/i-was-pollinated-today.png"},
        {name: "Don't Tell Me Your Name", price: 15, imgSrc: "/pics/dont-tell-me-your-name.png"},
        {name: "You Get Me Through", price: 15, imgSrc: "/pics/you-get-me-through.png"},
        {name: "Things to Invent", price: 15, imgSrc: "/pics/things-to-invent.png"},
        {name: "These Are MY Hands", price: 15, imgSrc: "/pics/these-are-my-hands.png"}
    ], (err, data)=>{
        res.redirect('/prints');
    })
});

// display all prints
router.get('/', (req,res) => {
    Print.find({}, (err,prts) => {
        Cart.findOne({}).populate('idArray').then( (found) => {
            res.render('prints.ejs', {
                cart : found.idArray,
                prints : prts,
                route : "_prints_"
            });
        });
    });
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
            print: pnt,
        });
    });
});

router.get('/remove/:id/:r1/', (req,res) => {
    Cart.findOneAndUpdate({},{$pull: { idArray : req.params.id}}, {new: true}, (err,cart) => {
        res.redirect(req.params.r1.replace(/_/g,'/'));
    });
});


// show page
router.get('/:id', (req,res) => {
    Cart.findOne({}).populate('idArray').then( (found) => {
        Print.findById(req.params.id, (err,pnt) => {
            res.render("show.ejs", {
                cart : found.idArray,
                print : pnt,
                route : "_prints_"+req.params.id
            });
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