const { newProduct, getAllProducts, updateProduct } = require("../controllers/ProductControllers")
const { isAuthenticatedUser } = require("../middleware/auth")

const multer = require('multer')

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './products')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

const router = require("express").Router()

router.post('/product/new', upload.array("images"), isAuthenticatedUser, newProduct)
router.get('/product/all', getAllProducts)
router.put('/product/:id', upload.array("images"), updateProduct)

module.exports = router