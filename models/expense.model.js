const mongoose = require('mongoose')
const Category = require('./category.model')
const User = require('./user.model')

const expenseSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    },
    amount: {
        type: Number,
        required: [true, 'amount is required'],
        default: 0
    },
    date: {
        type: Date,
        required: [true, 'amount is required'],
    }
})

module.exports = mongoose.model('Expense', expenseSchema)