const sender = require("../config/emailConfig");

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  // Use sender.sendMail to send the email
  sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: mailBody,
  }, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendBasicEmail;
