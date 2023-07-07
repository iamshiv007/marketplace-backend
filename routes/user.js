const router = require('express').Router()
const { registerUser, loginUser, userDetails, logoutUser } = require('../controllers/userControllers')
const { isAuthenticatedUser } = require('../middleware/auth')

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/me').get(isAuthenticatedUser, userDetails)
router.route('/user/logout').get(logoutUser)

module.exports = router