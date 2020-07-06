const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const printSchema = new Schema({
    name: {type: String, required: true },
    price: { type: Number, default: 15},
    imgSrc: {type: String, required: true},
}, { timestamps: true });

const Print = mongoose.model('Print', printSchema);

module.exports = Print;