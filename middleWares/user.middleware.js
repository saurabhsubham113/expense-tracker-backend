const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.isLoggedIn = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).send({ error: "Please login to continue" })
        }

        const token = req.header("Authorization").replace("Bearer ", "")

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodeToken.id)
        // console.log(user, decodeToken)
        req.user = user
        next()
    } catch (error) {
        res.status(400).send({ error: "No user found" })
    }
}