const Product = require('../models/productSchema')

// 1. New Product
exports.newProduct = async (req, res) => {

    try {

        const images = req.files.map((file) => file.filename)

        const { ...body } = req.body

        const product = await Product.create({ ...body, images })

        res.status(201).json({ success: true, message: "Product created", product })

    } catch (error) {
        res.status(500).json({ success: true, error })
    }
}

exports.getAllProducts = async (req, res) => {

    try {

        const products = await Product.find().populate("developer")

        res.status(200).json({ success: true, products })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {

        const oldProduct = await Product.findById(req.params.id)

        var images;

        if (req.files) {
            images = [...oldProduct.images, ...req.files.map((file) => file.filename)]
        } else {
            images = [...oldProduct.images]
        }

        const { ...body } = req.body

        const newProduct = await Product.findByIdAndUpdate(req.params.id, { ...body, images })

        res.status(201).json({ success: true, message: "Product Updated", newProduct })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
