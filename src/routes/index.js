const express = require('express')
const notif = require('../middlewares/send-notif')
const router = express.Router()

router
  .post('/sendnotif', notif.sendNotif)

module.exports = router