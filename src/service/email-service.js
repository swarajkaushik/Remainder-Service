const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");

const repo = new TicketRepository();
const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  // Use sender.sendMail to send the email
  sender.sendMail(
    {
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};

const fetchPendingEmails = async () => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const ticket = await repo.update(ticketId, data);
    return ticket;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
};
