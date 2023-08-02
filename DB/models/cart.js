const mongoose = require('mongoose');

const cartScheme =  new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {collection: 'cartData'})

const model = mongoose.model('cartSchema', cartScheme);
module.exports = model;