const mongoose = require("mongoose");
const { Schema } = mongoose

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', UserSchema)