// auth.js
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'your-secret-key' // Replace with your own secret key

const createToken = payload => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

  return token
}

export const verifyToken = token => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY)

    return decoded
  } catch (error) {
    return null
  }
}

module.exports = {
  createToken,
  verifyToken

  // Other utility functions related to authentication
}
