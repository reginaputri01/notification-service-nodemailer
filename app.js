require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./src/routes/index')
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)
app.use((req, res) => {
    res.status(404).json({
      status_code: 404,
      message: 'URL Failed',
    })
})
app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`) 
})
