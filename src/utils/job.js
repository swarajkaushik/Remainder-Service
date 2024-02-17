const cron = require("node-cron");
const emailService = require("../service/email-service");
const sender = require("../config/emailConfig");

const setupJobs = () => {
  cron.schedule("*/15 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail(
        {
          from: email.from,
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (error, data) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", data.response);
            await emailService.updateTicket(email.id, {
              status: "SUCCESS",
            });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
