const nodemailer = require("nodemailer")

function emailTo(host, fromEmail, password, toEmail, subject, html, callback) {
  const transporter = nodemailer.createTransport({
    host,
    secureConnection: false,
    auth: {
      user: fromEmail,
      pass: password,
    },
  })
  const mailOptions = {
    form: fromEmail,
    to: toEmail,
    subject: subject,
    html,
  }
  const result = {
    httpCode: 200,
    message: "发送成功",
  }

  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        result.httpCode = 500
        result.message = err
        callback(result)
        return
      }
      callback(result)
    })
  } catch (e) {
    result.httpCode = 500
    result.message = err
    callback(result)
  }
}

module.exports = emailTo
