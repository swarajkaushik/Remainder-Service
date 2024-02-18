const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const jobs = require("./utils/job");
const TicketController = require("./controllers/ticket-controller");
const { connectionChannel } = require("./utils/messageQueue");

const setupAndRunServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/api/v1/ticket", TicketController.create);
  app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}`);
    jobs();
  });
};

setupAndRunServer();
