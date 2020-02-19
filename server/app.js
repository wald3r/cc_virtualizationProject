const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/fact', router)


module.exports = app
