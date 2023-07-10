const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    websiteURL: {
        type: String,
    },
    birthDate: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Users", userSchema)