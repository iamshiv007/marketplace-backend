const router = require('express').Router()

// User
const user = require('./user')

router.use("/", user)

module.exports = router