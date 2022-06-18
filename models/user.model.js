const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [3, 'First Name should be atleast 3 characters long'],
        required: [true, 'First Name is requires'],
        trim: true
    },
    lastName: {
        type: String,
        minlength: [3, 'Last Name should be atleast 3 characters long'],
        required: [true, 'Last Name is requires'],
        trim: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please enter a valid email'],
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, 'Password should be atleast 6 chars longs'],
        select: false
    },
    avatar: {
        type: String,
        trim: true

    }
}, { timestamps: true })

/**
 * Hashing the password before saving to the DB
 * @param {function}  calling the next function
 *
*/
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
})


/**
 * check if password is valid
 * @param {string} userPassword
 * @returns {boolean} if password is valid or not
 * 
*/
userSchema.methods.isValidPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

/**
 * Creating a JWT token to validate
 * @returns {String} a jwt token for the respective user
 * 
*/
userSchema.methods.getJwtToken = async function () {
    console.log(this._id)
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = mongoose.model('User', userSchema)