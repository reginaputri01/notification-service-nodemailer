const nodemailer = require('nodemailer')

module.exports = {
  sendNotif: (req, res) => {
    const transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER,
        auth: {
            user: process.env.YOUR_EMAIL,
            pass: process.env.YOUR_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.YOUR_EMAIL,
        to: req.body.email,
        subject: 'Notification',
        html: '<h1>Hai, Selamat Datang</h1> <p>Selamat Bersenang-senang!</p>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err
        console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
        res.status(200).json({
            status_code : 200,
            message : 'Check Your Email!'
        })
    })
  }
}