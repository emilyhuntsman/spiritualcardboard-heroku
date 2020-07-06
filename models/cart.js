const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const cartSchema = new Schema({
    idArray: [{type: Schema.Types.ObjectId}],
    user: {type: String},
    address: {type: String},
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;