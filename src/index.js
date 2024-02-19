const express = require("express");
const bodyParser = require("body-parser");
const { PORT, REMAINDER_BINDING_KEY } = require("./config/serverConfig");
const jobs = require("./utils/job");
const TicketController = require("./controllers/ticket-controller");
const { connectionChannel, subscribeMessage } = require("./utils/messageQueue");
const EmailService = require("./service/email-service");

const setupAndRunServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/api/v1/ticket", TicketController.create);

  const channel = await connectionChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMAINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}`);
    // jobs();
  });
};

setupAndRunServer();
