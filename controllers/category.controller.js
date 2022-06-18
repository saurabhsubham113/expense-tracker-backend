const mongoose = require('mongoose')
const Category = require('../models/category.model')
const CustomError = require('../utils/CustomError')

exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        if (!categoryName) {
            throw new CustomError("Please provide a category name", 400)
        }

        const category = await Category.create({ categoryName, user: req.user._id })

        res.status(200).send({ data: category })
    } catch (error) {
        res.status(error.status || 400).send({ error: error.message })
    }
}


exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.find({ user: req.user._id })
        if (!category) {
            throw new CustomError('No category found', 404)
        }
        res.status(200).send({ data: category })
    } catch (error) {
        res.status(error.status || 404).send({ error: error.message })
    }
}


exports.getOneCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new CustomError("Please provide a category Id", 400)
        }
        const category = await Category.findById(id)
        if (!category) {
            throw new CustomError('No category found', 404)
        }
        res.status(200).send({ data: category })
    } catch (error) {
        res.status(error.status || 404).send({ error: error.message })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { categoryName } = req.body

        let category = await Category.findById(id)
        if (!category) {
            throw new CustomError('No Category found', 404)
        }

        if (!categoryName) {
            throw new CustomError("Please provide a category Name", 400)
        }
        category = await Category.findByIdAndUpdate(id, { categoryName }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).send({ data: category })
    } catch (error) {
        res.status(error.status || 400).send({ error: error.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        let category = await Category.findById({ id })
        if (!category) {
            throw new CustomError('No Category found', 404)
        }
        await category.remove()
        res.status(200).send({ data: "category deleted successfully" })

    } catch (error) {
        res.status(error.status || 400).send({ error: error.message })
    }
}

