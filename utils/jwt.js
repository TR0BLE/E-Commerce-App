const jwt = require('jsonwebtoken')

const createJWT = async ({ payload }) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    return token;
}

const isTokenValid = async ({ token }) => {
    const result = await jwt.verify(token, process.env.JWT_SECRET)
    return result
}

module.exports = {
    createJWT,
    isTokenValid
}