const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')

const connectDB = require('./Config/db')

const { readdirSync } = require('fs')
const app = express()

connectDB()

app.use(morgan('dev'))  // Middleware morgan
app.use(cors())
app.use(bodyParse.json({ limit: '10mb' }))

readdirSync('./Routes').map((r) => {
    app.use('/api', require('./Routes/' + r))
})


app.listen(5000, () => {
    console.log(`Server is running on Port 5000`);
})