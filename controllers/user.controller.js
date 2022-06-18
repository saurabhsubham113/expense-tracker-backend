const User = require('../models/user.model')
const CustomError = require('../utils/CustomError')


exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, avatar } = req.body

        if (!firstName || !lastName || !email || !password) {
            throw new CustomError("firstname,lastname,email and password is required", 400)
        }

        const user = await User.create({ firstName, lastName, email, password, avatar })

        const token = await user.getJwtToken()
        user.password = undefined

        res.status(200).send({ data: { token, user } })
    } catch (error) {
        error.code = error.code === 11000 ? 400 : 400
        res.status(error.code || 400).send({ error: error.message })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new CustomError("Please provide email and password", 400)
        }

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            throw new CustomError('No registered user found', 404)
        }

        const isValidPassword = await user.isValidPassword(password)
        if (!isValidPassword) {
            throw new CustomError('Email or password is incorrect', 401)
        }

        const token = await user.getJwtToken()
        user.password = undefined

        res.status(200).send({ data: { token, user } })

    } catch (error) {
        res.status(error.code || 401).send({ error: error.message })
    }
}