const express = require('express')
const { getOneCategory, getAllCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')
const { isLoggedIn } = require('../middleWares/user.middleware')
const router = express.Router()

router.route('/category/:id').get(isLoggedIn, getOneCategory)
router.route('/all/category').get(isLoggedIn, getAllCategory)

router.route('/add/category').post(isLoggedIn, addCategory)
router.route('/update/category/:id').put(isLoggedIn, updateCategory)

router.route('/delete/category/:id').put(isLoggedIn, deleteCategory)

module.exports = router