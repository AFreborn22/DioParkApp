const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aafauzan52@gmail.com',
    pass: 'blpz sbrg pnlx yfgi',
  },
});

module.exports = { transporter };
