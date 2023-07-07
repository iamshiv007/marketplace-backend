const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

// 1. Register user
exports.registerUser = async (req, res) => {
    try {

        const { password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ ...req.body, password: hashedPassword })

        const token = await jwt.sign(user.id, process.env.SECRET_KEY)

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: false,
            secure: true
        }

        res.cookie('myToken', token, options).status(201).json({ success: true, message: "User Created", user })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// 2. Login User
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please input all required fields" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" })
        }

        const token = await jwt.sign(user.id, process.env.SECRET_KEY)

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: false,
            secure: true
        }

        res.cookie('myToken', token, options).status(200).json({ success: true, message: "Logged in Successfully", user })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// 3. Logged In User data
exports.userDetails = (req, res) => {
    res.status(200).json({ success: true, user: req.user })
}

// 4. Logout User
exports.logoutUser = (req, res) => {

    try {
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: false,
            secure: true
        }

        res.cookie('myToken', null, options).status(200).json({ success: true, message: "Logout Successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}