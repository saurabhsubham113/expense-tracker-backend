const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    customCategoryName: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Category', categorySchema)