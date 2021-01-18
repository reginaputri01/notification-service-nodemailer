require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`) 
})

const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER,
    auth: {
        user: process.env.YOUR_EMAIL,
        pass: process.env.YOUR_PASSWORD
    }
});

app.post('/send-email', (req, res) => {
    const email = req.body.email
    const mailOptions = {
        from: process.env.YOUR_EMAIL,
        to: email,
        subject: 'Notification',
        html: '<h1>Hai, Selamat Datang</h1> <p>Selamat Bersenang-senang!</p>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        const data = {
            'status': 200,
            'values': 'Check Your Email!'
        };
        
        if (err) throw err
        console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
        res.json(data)
      })
});
