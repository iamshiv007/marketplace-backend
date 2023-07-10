const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    developer: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Users'
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    languages: {
        type: Array,
        required: true
    },
    usability: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model("Products", productSchema)