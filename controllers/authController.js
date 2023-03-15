const StatusCodes = require("http-status-codes");
const User = require("../models/Users");
const CustomError = require('../errors')
const { createJWT, isTokenValid } = require('../utils')


const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
        throw new CustomError.BadRequestError('Please provide user name.')
    }
    if (!email) {
        throw new CustomError.BadRequestError('Please provide user email.')
    }
    if (!password) {
        throw new CustomError.BadRequestError('Please provide password.')
    }
    const isEmailAlreadyInUse = await User.findOne({ email })
    if (isEmailAlreadyInUse) {
        throw new CustomError.BadRequestError('User already registered')
    }

    const isFirstAccount = await User.countDocuments() === 0;
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({ name, email, password, role })

    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    const token = await createJWT({ payload: tokenUser })

    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
}

const login = async (req, res) => {
    res.send('Login Successful')
}

const logout = async (req, res) => {
    res.send('Logout Successful')
}

module.exports = {
    register,
    login,
    logout
}