const express = require('express')

require('dotenv').config()
require('./config/db.config')

const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"))

/**
 * Routes
 */
const userRoute = require('./routes/user.route')
const CategoryRoute = require('./routes/category.router')


app.use('/api/v1', userRoute)
app.use('/api/v1', CategoryRoute)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`server up and running at ${port}`);
})