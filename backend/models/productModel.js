const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    embeddings: {
        type: [[Number]], // Array of arrays, because multiple images
        default: [],
        required: false,
    }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;