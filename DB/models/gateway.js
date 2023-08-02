const mongoose = require('mongoose');

const gatewaySchema =  new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
      type: Number,
      required: true
    },
    ammount: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {collection: 'transactions'})

const model = mongoose.model('gatewaySchema', gatewaySchema);
module.exports = model;