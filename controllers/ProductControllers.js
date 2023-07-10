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

