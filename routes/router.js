const router = require('express').Router()

// User
const user = require('./user')
router.use("/", user)

// Product
const product = require('./product')
router.use('/', product)

module.exports = router