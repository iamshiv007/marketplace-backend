const jwt = require("jsonwebtoken")
const userSchema = require("../models/userSchema")

exports.isAuthenticatedUser = async (req, res, next) => {

    try {
        const { myToken } = req.cookies

        if (!myToken) {
            return res.status(401).json({ success: false, message: "Please login to access this resource" })
        }

        const decodedData = await jwt.verify(myToken, process.env.SECRET_KEY)

        const user = await userSchema.findById(decodedData)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not Found" })
        }

        req.user = user
        next()

    } catch (error) {
        res.status(500).json({ success: true, message: error.message })
    }
}