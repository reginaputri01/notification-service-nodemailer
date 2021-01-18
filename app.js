require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
const PORT = 4000

let transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER,
    auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
    }
});

app.post('/send-email', (req, res) => {
    // const email = req.body.email

    const mailOptions = {
        from: process.env.MAILER_EMAIL_ID,
        to: 'reginaputria2003@gmail.com',
        subject: 'Notification',
        html: '<h1>Hai, Selamat Datang</h1> <p>Selamat Bersenang-senang!</p>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err
        console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
      })
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`) 
})